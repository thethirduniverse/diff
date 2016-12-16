# frozen_string_literal: true
module PostResponseHelper
  include DiffHelper

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

  def render_to_root(post)
    if post.parent_post_id.nil?
      render_post post
      return
    end

    p = post
    posts = []

    until p.nil?
      posts.unshift(p)
      p = p.parent_post
    end

    render_post_list posts
  end

  def render_post(post)
    render json: {
      post: post_response(post)
    }
  end

  def render_post_list(posts)
    render json: {
      post: post_recursive_response(posts, 0)
    }
  end

  def render_validation_error(model)
    render json: {
      errors: model.errors.messages
    }, status: 400
  end

  def render_error(sym, message)
    obj = {}
    obj[sym] = message
    render json: {
      errors: obj
    }, status: 400
  end
end
