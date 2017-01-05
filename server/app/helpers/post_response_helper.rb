# frozen_string_literal: true
module PostResponseHelper
  include UserHelper

  POST_FEED_RESPONSE_TYPE_DEFAULT = :default
  POST_FEED_RESPONSE_TYPE_SIMPLIFIED = :simplified

  def post_recursive_response(posts, idx, current_user: nil)
    p = posts[idx]
    base = if idx.zero?
             post_recursive_root_base(p, current_user: current_user)
           else
             post_reply_response(p, current_user: current_user)
           end
    base[:posts] = idx == posts.length - 1 ? [] : [post_recursive_response(posts, idx + 1)]
    base
  end

  def post_recursive_root_base(p, current_user: nil)
    base = post_response_simplified(p, current_user: current_user)
    base.merge!(post_ids: p.posts.pluck(:id))
  end

  def post_response(t, current_user: nil)
    base = post_response_simplified(t, current_user: current_user)
    base.merge!(content: t.content,
                parent_post_id: t.parent_post_id,
                root_post_id: t.root_post_id,
                posts: t.posts.map do |r|
                         post_reply_response(r, current_user: current_user)
                       end)
  end

  def post_response_simplified(t, current_user: nil)
    {
      id: t.id,
      title: t.title,
      view: t.view,
      upvote_count: t.upvote_count,
      user_upvoted: t.upvoted_by?(current_user),
      categories: t.categories.map do |c|
        category_response c
      end,
      last_edit: last_edit_response(t)
    }
  end

  def post_reply_response(r, current_user: nil)
    {
      id: r.id,
      upvote_count: r.upvote_count,
      user_upvoted: r.upvoted_by?(current_user),
      content: r.content,
      parent_post_id: r.parent_post_id,
      root_post_id: r.root_post_id,
      post_ids: r.posts.pluck(:id),
      last_edit: last_edit_response(r)
    }
  end

  def last_edit_response(post)
    { user: user_header_response(post.last_edit.user) } if post.last_edit
  end
end
