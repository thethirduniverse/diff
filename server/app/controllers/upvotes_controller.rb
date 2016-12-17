# frozen_string_literal: true
class UpvotesController < ApplicationController
  include UpvoteHelper

  clear_respond_to
  respond_to :json
  before_action :authenticate_user!

  def create
    post = Post.find(params[:post_id])
    user = current_user

    upvoted = post.upvoted_by?(user)

    if upvoted
      render_success
      return
    end

    if Upvote.create(post: post, user: user).persisted?
      post.update(upvote_count: post.upvote_count + 1)
      render_success
    else
      render_create_failure
    end
  end

  def destroy
    post = Post.find(params[:post_id])
    user = current_user

    upvote = Upvote.where(post: post, user: user).take

    if upvote.nil?
      render_success
      return
    end

    if upvote.destroy
      post.update(upvote_count: post.upvote_count - 1)
      render_success
    else
      render_destroy_failure
    end
  end
end
