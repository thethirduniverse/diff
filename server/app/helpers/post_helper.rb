# frozen_string_literal: true
module PostHelper
  include CategoryHelper
  include ReplyHelper

  BATCH_SIZE = 10

  POST_FEED_RESPONSE_TYPE_DEFAULT = :default
  POST_FEED_RESPONSE_TYPE_SIMPLIFIED = :simplified

  def posts_feed(offset: 0,
                 category_id: nil,
                 user_id: nil,
                 response_type: POST_FEED_RESPONSE_TYPE_DEFAULT)

    posts = index_posts_query(offset, category_id, user_id)

    posts_feed_response(posts, response_type, offset)
  end

  def index_posts_query(offset, category_id, user_id)
    base =
      if category_id && user_id
        User.find(user_id).posts.joins(:posts_categories).where(posts_categories: { category_id: category_id })
      elsif user_id
        User.find(user_id).posts
      elsif category_id
        Category.find(category_id).posts
      else
        Post
      end

    base.order(created_at: :desc).offset(offset).first(BATCH_SIZE + 1)
  end

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

  def post_response(t)
    {
      id: t.id,
      title: t.title,
      content: t.content,
      view: t.view,
      categories: t.categories.map do |c|
        category_response c
      end,
      posts: t.posts.map do |r|
        reply_response r
      end
    }
  end

  def post_response_simplified(t)
    {
      id: t.id,
      title: t.title,
      view: t.view,
      categories: t.categories.map do |c|
        category_response c
      end
    }
  end
end
