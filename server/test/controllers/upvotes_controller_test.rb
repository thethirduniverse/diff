# frozen_string_literal: true
require 'test_helper'

class UpvotesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'it should work' do
    user = User.first
    sign_in user

    p = Post.first
    assert_equal false, p.upvoted_by?(user)

    post :create, xhr: false, params: {
      post_id: p.id
    }
    assert_equal 204, @response.status
    assert_equal true, p.upvoted_by?(user)
  end

  test 'it should allow a post to be upvoted twice' do
    user = User.first
    sign_in user

    p = Post.first
    assert_equal false, p.upvoted_by?(user)
    assert_equal 0, p.upvote_count

    post :create, xhr: true, params: {
      post_id: p.id
    }
    assert_equal 204, @response.status
    assert_equal true, p.upvoted_by?(user)

    post :create, xhr: true, params: {
      post_id: p.id
    }
    assert_equal 204, @response.status
    assert_equal true, p.upvoted_by?(user)

    p.reload
    assert_equal 1, p.upvote_count
    assert_equal 1, Upvote.where(user: user, post: p).count
  end

  test 'it should allow upvote to be deleted' do
    user = User.first
    sign_in user

    p = Post.first
    assert_equal false, p.upvoted_by?(user)

    post :create, xhr: true, params: {
      post_id: p.id
    }
    assert_equal 204, @response.status
    assert_equal true, p.upvoted_by?(user)

    delete :destroy, xhr: true, params: {
      post_id: p.id
    }

    p.reload
    assert_equal 0, p.upvote_count
    assert_equal 204, @response.status
    assert_equal false, p.upvoted_by?(user)
  end

  test 'it should allow upvote to be deleted even when not actually upvoted' do
    user = User.first
    sign_in user

    p = Post.first
    assert_equal false, p.upvoted_by?(user)

    delete :destroy, xhr: true, params: {
      post_id: p.id
    }
    assert_equal 204, @response.status
    assert_equal false, p.upvoted_by?(user)
  end
end
