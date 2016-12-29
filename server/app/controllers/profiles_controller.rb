# frozen_string_literal: true
class ProfilesController < ApplicationController
  include PostHelper

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

  def load_posts
    id = params[:id]
    offset = params[:offset] ? Integer(params[:offset]) : nil

    render json: {
      posted_posts: posts_feed(offset: offset, user_id: id, response_type: PostHelper::POST_FEED_RESPONSE_TYPE_SIMPLIFIED)
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
      name: u.name,
      bio: u.bio,
      email: u.email,
      posted_posts: posts_feed(user_id: u.id, response_type: PostHelper::POST_FEED_RESPONSE_TYPE_SIMPLIFIED),
      avatar: u.avatar.url(:large),
    }
  end
end
