# frozen_string_literal: true
require 'test_helper'
class ReportsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'sign in is required' do
    creator = User.first
    assert_nil Report.find_by_creator_id(creator.id)

    user = User.second
    post :report_user, xhr: true, params: {
      report: {
        user_id: user,
        content: 'test content'
      }
    }
    assert_equal 401, @response.status
  end

  test 'user can post user report' do
    creator = User.first
    sign_in creator
    assert_nil Report.find_by_creator_id(creator.id)

    user = User.second
    post :report_user, xhr: true, params: {
      report: {
        user_id: user,
        content: 'test content'
      }
    }
    assert_equal 200, @response.status

    report = Report.find_by_creator_id(creator.id)
    refute_nil report
    assert_equal 'test content', report.content
    assert_equal report.creator.id, creator.id
    assert_equal report.user.id, user.id
  end

  test 'user can post topic report' do
    creator = User.first
    sign_in creator
    assert_nil Report.find_by_creator_id(creator.id)

    topic = Topic.first
    post :report_topic, xhr: true, params: {
      report: {
        topic_id: topic,
        content: 'test content'
      }
    }
    assert_equal 200, @response.status

    report = Report.find_by_creator_id(creator.id)
    refute_nil report
    assert_equal 'test content', report.content
    assert_equal report.creator.id, creator.id
    assert_equal report.topic.id, topic.id
  end

  test 'user can post reply report' do
    creator = User.first
    sign_in creator
    assert_nil Report.find_by_creator_id(creator.id)

    reply = Reply.first
    post :report_reply, xhr: true, params: {
      report: {
        reply_id: reply,
        content: 'test content'
      }
    }
    assert_equal 200, @response.status

    report = Report.find_by_creator_id(creator.id)
    refute_nil report
    assert_equal 'test content', report.content
    assert_equal report.creator.id, creator.id
    assert_equal report.reply.id, reply.id
  end
end
