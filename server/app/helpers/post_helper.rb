# frozen_string_literal: true
module PostHelper
  include PostRenderHelper
  include PostResponseHelper
  include CategoryHelper
  include DiffHelper

  def posts_feed(specification,
                 response_type: PostResponseHelper::POST_FEED_RESPONSE_TYPE_DEFAULT)
    posts = specification.posts
    has_more = posts.length > specification.batch_size
    posts = posts[0..specification.batch_size - 1] # slice indexes are inclusive

    {
      posts: posts.map do |post|
        case response_type
        when PostResponseHelper::POST_FEED_RESPONSE_TYPE_SIMPLIFIED
          post_response_simplified post
        else
          post_response post
        end
      end,
      has_more: has_more,
      next_offset: specification.offset + posts.length
    }
  end

  def update_post_or_render_errors(post, new_content)
    post.content = new_content

    unless post.valid?
      render_validation_error post
      return false
    end

    true
  end

  def create_edit_and_render_errors(message, post, old_content, new_content)
    e = new_edit(message, post, old_content, new_content)
    e.save!
    return e
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
