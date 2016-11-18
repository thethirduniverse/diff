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

  def load_posted_topics
    id = params[:id]
    offset = params[:offset] ? Integer(params[:offset]) : nil

    render json: {
      posted_topics: topics_feed(offset: offset, user_id: id, response_type: TopicHelper::TOPIC_FEED_RESPONSE_TYPE_SIMPLIFIED)
    }
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
      posted_topics: topics_feed(user_id: u.id, response_type: TopicHelper::TOPIC_FEED_RESPONSE_TYPE_SIMPLIFIED),
      avatar: u.avatar.url(:large)
    }
  end
end
