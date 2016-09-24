# frozen_string_literal: true
require 'test_helper'

class TopicsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'index returns a list of topics' do
    post :index, xhr: true

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_kind_of Array, json['topics']
  end

  test 'show returns a single article if that article exists' do
    get :show, xhr: true, params: { id: 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal 1, json['topic']['id']
  end

  test 'show returns 404 if that article does not exist' do
    get :show, xhr: true, params: { id: 999 }

    assert_equal 404, @response.status
    assert_equal 'application/json', @response.content_type
  end

  test 'show increments topic view count' do
    view_before = Topic.find(1).view
    get :show, xhr: true, params: { id: 1 }

    assert_equal view_before + 1, Topic.find(1).view
  end

  test 'logged in user can post new topic' do
    assert_nil Topic.find_by_title('New Topic')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'topic[title]': 'New Topic',
                                       'topic[content]': 'New Content' }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['topic']

    topic = Topic.find_by_title('New Topic')
    refute_nil topic
    assert_equal 1, topic.user_id
  end

  test 'logged out user can not post new topic' do
    post :create, xhr: true, params: { 'topic[title]': 'New Topic',
                                       'topic[content]': 'New Content' }

    assert_equal 401, @response.status
    assert_nil Topic.find_by_title('New Topic')
  end

  test 'show returns a topics with categores' do
    get :show, xhr: true, params: { id: 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    refute_nil json['topic']['categories'][0]['id']
    refute_nil json['topic']['categories'][1]['id']
    assert_equal 'Philosophy', json['topic']['categories'][0]['name']
    assert_equal 'Metaphysics', json['topic']['categories'][1]['name']
  end
end
