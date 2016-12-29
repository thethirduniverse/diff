# frozen_string_literal: true
module RenderHelper
  def render_empty_success
    render json: {}, status: 204
  end

  def render_model_errors(model)
    render json: {
      errors: model.errors.messages
    }, status: 400
  end

  def render_unauthorized
    render json: {
      error: 'You are not authorized to perform this action.'
    }, status: 401
  end
end
