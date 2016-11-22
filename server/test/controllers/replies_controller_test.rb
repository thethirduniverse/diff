# frozen_string_literal: true
require 'test_helper'
class RepliesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'user can post reply' do
    adam = User.find(1)
    sign_in adam
    topic = Topic.find(1)
    refute_nil topic

    post :create, xhr: true, params: {
      'reply[topic_id]': topic.id,
      'reply[content]': 'reply content'
    }

    JSON.parse(@response.body)
    assert_equal 200, @response.status

    reply = Reply.find_by_content('reply content')
    refute_nil reply
    assert_equal reply.topic.id, topic.id
    assert_equal reply.creator.id, adam.id
  end

  test 'reply can not be blank' do
    adam = User.find(1)
    sign_in adam
    topic = Topic.find(1)
    refute_nil topic

    post :create, xhr: true, params: {
      'reply[topic_id]': topic.id,
      'reply[content]': ''
    }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    assert_equal ['can\'t be blank'], json['errors']['content']
  end

  test 'reply can not point to an invalid topic' do
    adam = User.find(1)
    sign_in adam
    assert_nil Topic.find_by_id(999)

    post :create, xhr: true, params: {
      'reply[topic_id]': 999,
      'reply[content]': 'reply content'
    }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    assert_equal ['can\'t be blank'], json['errors']['topic']
  end

  test 'replies will return list of replies' do
    reply = Reply.first
    assert_equal 0, reply.replies.count

    post :replies, xhr: true, params: {
      'reply[reply_id]': reply.id
    }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal [], json['replies']

    # add a record
    r2 = Reply.new(content: 'some',
                   topic: Topic.find(reply.topic_id),
                   reply_id: reply.id,
                   creator: User.first)
    assert_equal true, r2.save

    post :replies, xhr: true, params: {
      'reply[reply_id]': reply.id
    }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 1, json['replies'].length

    # add a record again
    r3 = Reply.new(content: 'some',
                   topic: Topic.find(reply.topic_id),
                   reply_id: reply.id,
                   creator: User.first)
    assert_equal true, r3.save

    post :replies, xhr: true, params: {
      'reply[reply_id]': reply.id
    }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 2, json['replies'].length
  end
end
