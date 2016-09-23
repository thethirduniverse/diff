# frozen_string_literal: true
class ProfilesController < ApplicationController
  clear_respond_to
  respond_to :json

  def show
    id = params[:id]

    user = User.find(id)
    render json: {
      user: profile_response(user)
    }

  rescue ActiveRecord::RecordNotFound
    head 404, content_type: 'application/json'
  end

  private

  def profile_response(u)
    {
      id: u.id,
      email: u.email
    }
  end
end
