# frozen_string_literal: true
class ProfilesController < ApplicationController
  include PostHelper
  include FeedSpecification

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
    spec = UserFeedSpecification.new(offset, 10, id)

    render json: {
      posted_posts: posts_feed(spec, response_type: PostHelper::POST_FEED_RESPONSE_TYPE_SIMPLIFIED)
    }
  end

  private

  def viewing_self(u)
    return false unless user_signed_in?
    current_user.id == u.id
  end

  def profile_response(u)
    spec = UserFeedSpecification.new(10, u.id)
    {
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      bio: u.bio,
      email: u.email,
      posted_posts: posts_feed(spec, response_type: PostHelper::POST_FEED_RESPONSE_TYPE_SIMPLIFIED),
      avatar: u.avatar.url(:thumb)
    }
  end
end
