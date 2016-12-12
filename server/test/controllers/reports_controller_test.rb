# frozen_string_literal: true
require 'test_helper'
class ReportsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    ActionMailer::Base.deliveries.clear
  end

  test 'sign in is required' do
    creator = User.first
    assert_nil Report.find_by_creator_id(creator.id)
    assert_empty ActionMailer::Base.deliveries

    user = User.second
    post :report_user, xhr: true, params: {
      report: {
        user_id: user.id,
        content: 'test content'
      }
    }
    assert_equal 401, @response.status
    assert_empty ActionMailer::Base.deliveries
  end

  test 'user can post user report' do
    creator = User.first
    sign_in creator
    assert_nil Report.find_by_creator_id(creator.id)

    user = User.second
    post :report_user, xhr: true, params: {
      report: {
        user_id: user.id,
        content: 'test content'
      }
    }
    assert_equal 200, @response.status

    report = Report.find_by_creator_id(creator.id)
    refute_nil report
    assert_equal 'test content', report.content
    assert_equal report.creator.id, creator.id
    assert_equal report.user.id, user.id

    email = ActionMailer::Base.deliveries.last
    refute_nil email
    assert_equal ENV['admin_email'], email.to.first
    assert_equal 'New User Report Created', email.subject
  end

  test 'user can create post report' do
    creator = User.first
    sign_in creator
    assert_nil Report.find_by_creator_id(creator.id)

    p = Post.first
    post :report_post, xhr: true, params: {
      report: {
        post_id: p.id,
        content: 'test content'
      }
    }
    assert_equal 200, @response.status

    report = Report.find_by_creator_id(creator.id)
    refute_nil report
    assert_equal 'test content', report.content
    assert_equal report.creator.id, creator.id
    assert_equal report.post.id, p.id

    email = ActionMailer::Base.deliveries.last
    refute_nil email
    assert_equal ENV['admin_email'], email.to.first
    assert_equal 'New Post Report Created', email.subject
  end
end
