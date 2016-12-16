# frozen_string_literal: true
module PostRenderHelper
  include PostResponseHelper

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
