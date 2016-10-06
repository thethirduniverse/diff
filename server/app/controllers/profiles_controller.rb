# frozen_string_literal: true
class ProfilesController < ApplicationController
  include TopicHelper

  clear_respond_to
  respond_to :json

  def show
    id = params[:id]

    user = User.find(id)
    render json: {
      user: profile_response(user),
      viewing_self: viewing_self(user)
    }

  rescue ActiveRecord::RecordNotFound
    head 404, content_type: 'application/json'
  end

  private

  def viewing_self(u)
    return false unless user_signed_in?
    current_user.id == u.id
  end

  def profile_response(u)
    {
      id: u.id,
      email: u.email,
      posted_topics: u.topics.last(10).map do |t|
        topic_response_simplified t
      end
    }
  end
end
