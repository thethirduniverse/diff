# frozen_string_literal: true
module PostHelper
  include PostRenderHelper
  include PostResponseHelper
  include CategoryHelper
  include DiffHelper

  def posts_feed(offset: 0,
                 category_id: nil,
                 user_id: nil,
                 response_type: PostResponseHelper::POST_FEED_RESPONSE_TYPE_DEFAULT)

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

    base.where('posts.root_post_id IS NULL').order(created_at: :desc).offset(offset).first(BATCH_SIZE + 1)
  end

  def create_edit_and_render_errors(message, post, old_content, new_content)
    e = new_edit(message, post, old_content, new_content)
    e.save!
    return true
  rescue ActiveRecord::RecordInvalid
    render_validation_error e
    return false
  rescue ContentNotChangedError
    render_error(:content, 'New content must be different from the old content.')
    return false
  rescue CommandFailedError
    render_error(:edit, 'Unable to create the edit for post update. Diff failed.')
    return false
  end

  def new_edit(message, post, old_content, new_content)
    Edit.new(user: current_user,
             post: post,
             version: Edit.where(post_id: post.id).count,
             message: message,
             patch: create_patch(old_content, new_content))
  end
end
