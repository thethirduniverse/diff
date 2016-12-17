# frozen_string_literal: true
module UpvoteHelper
  def render_success
    render json: {}, status: 204
  end

  def render_create_failure
    render json: {
      error: 'Upvote is not created.'
    }, status: 500
  end

  def render_destroy_failure
    render json: {
      error: 'Upvote is not deleted.'
    }, status: 500
  end
end
