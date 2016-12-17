# frozen_string_literal: true
module PostResponseHelper
  BATCH_SIZE = 10

  POST_FEED_RESPONSE_TYPE_DEFAULT = :default
  POST_FEED_RESPONSE_TYPE_SIMPLIFIED = :simplified

  def posts_feed_response(posts, response_type, offset)
    has_more = posts.length > BATCH_SIZE
    posts = posts[0..BATCH_SIZE - 1] # slice indexes are inclusive

    {
      posts: posts.map do |post|
        case response_type
        when POST_FEED_RESPONSE_TYPE_SIMPLIFIED
          post_response_simplified post
        else
          post_response post
        end
      end,
      has_more: has_more,
      next_offset: offset + posts.length
    }
  end

  def post_recursive_response(posts, idx)
    p = posts[idx]
    base = if idx.zero?
             post_recursive_root_base p
           else
             post_reply_response(p)
           end
    base[:posts] = idx == posts.length - 1 ? [] : [post_recursive_response(posts, idx + 1)]
    base
  end

  def post_recursive_root_base(p)
    {
      id: p.id,
      title: p.title,
      content: p.content,
      view: p.view,
      upvote_count: p.upvote_count,
      categories: p.categories.map do |c|
        category_response c
      end,
      post_ids: p.posts.pluck(:id)
    }
  end

  def post_response(t)
    {
      id: t.id,
      title: t.title,
      content: t.content,
      view: t.view,
      upvote_count: t.upvote_count,
      parent_post_id: t.parent_post_id,
      root_post_id: t.root_post_id,
      categories: t.categories.map do |c|
        category_response c
      end,
      posts: t.posts.map do |r|
        post_reply_response r
      end
    }
  end

  def post_response_simplified(t)
    {
      id: t.id,
      title: t.title,
      view: t.view,
      upvote_count: t.upvote_count,
      categories: t.categories.map do |c|
        category_response c
      end
    }
  end

  def post_reply_response(r)
    {
      'id': r.id,
      'upvote_count': r.upvote_count,
      'content': r.content,
      'parent_post_id': r.parent_post_id,
      'root_post_id': r.root_post_id,
      'post_ids': r.posts.pluck(:id)
    }
  end
end
