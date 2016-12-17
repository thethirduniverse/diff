# frozen_string_literal: true
class UpvotesController < ApplicationController
  include UpvoteHelper

  clear_respond_to
  respond_to :json
  before_action :authenticate_user!

  def create
    post = Post.find(params[:post_id])
    user = current_user

    if post.upvoted_by?(user) ||
       Upvote.create(post: post, user: user).persisted?
      render_success
    else
      render_create_failure
    end
  end

  def destroy
    post = Post.find(params[:post_id])
    user = current_user

    upvote = Upvote.where(post: post, user: user).take
    if upvote.nil? || upvote.destroy
      render_success
    else
      render_destroy_failure
    end
  end
end
