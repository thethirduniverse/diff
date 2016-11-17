# frozen_string_literal: true
require 'test_helper'

# rubocop:disable ClassLength
class TopicsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers
  include TopicHelper

  # Index
  test 'index returns a list of topics' do
    post :index, xhr: true

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_kind_of Array, json['topics']
  end

  test 'index respects category preferences' do
    category = Category.first
    post :index, xhr: true, params: { category_id: category.id }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_kind_of Array, json['topics']
    json['topics'].each do |t|
      assert_includes t['categories'], 'id' => category.id,
                                       'name' => category.name
    end
  end

  test 'has_more is true when it does have more content to load' do
    assert_equal true, Topic.count > TopicHelper::BATCH_SIZE
    post :index, xhr: true, params: {}

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal true, json['has_more']
    assert_equal BATCH_SIZE, json['next_offset']
  end

  test 'has_more is false when it does not have more content to load' do
    assert_equal true, Topic.count > TopicHelper::BATCH_SIZE
    post :index, xhr: true, params: { offset: Topic.count - 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal false, json['has_more']
    assert_equal Topic.count, json['next_offset']
  end

  test 'has_more is true when it does have more content to load for a category' do
    category = Category.find_by_name('Philosophy')
    count = category.topics.count
    assert_equal true, count > TopicHelper::BATCH_SIZE
    post :index, xhr: true, params: { category_id: category.id }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal true, json['has_more']
    assert_equal BATCH_SIZE, json['next_offset']
  end

  test 'has_more is false when it does not have more content to load for a category' do
    category = Category.find_by_name('Philosophy')
    count = category.topics.count
    assert_equal true, count > TopicHelper::BATCH_SIZE
    post :index, xhr: true, params: { category_id: category.id, offset: count - 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal false, json['has_more']
    assert_equal count, json['next_offset']
  end

  # Show
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

  test 'show returns a topic with replies' do
    get :show, xhr: true, params: { id: 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal 'Some Content 1', json['topic']['replies'][0]['content']
    assert_equal 'Some Content 2', json['topic']['replies'][1]['content']
  end

  # Create
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

  test 'cannot post without content' do
    assert_nil Topic.find_by_title('New Topic')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'topic[title]': 'New Topic' }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    refute_nil json['errors']
    assert_equal ['can\'t be blank'], json['errors']['content']

    topic = Topic.find_by_title('New Topic')
    assert_nil topic
  end

  test 'cannot post without title' do
    assert_nil Topic.find_by_content('New Content')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'topic[content]': 'New Content' }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    refute_nil json['errors']
    assert_equal ['can\'t be blank'], json['errors']['title']

    topic = Topic.find_by_content('New Content')
    assert_nil topic
  end

  test 'user can specify an array of category ids' do
    assert_nil Topic.find_by_title('New Topic')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'topic[title]': 'New Topic',
                                       'topic[content]': 'New Content',
                                       'topic[category_ids]': [
                                         categories(:category1).id,
                                         categories(:category2).id
                                       ] }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['topic']

    topic = Topic.find_by_title('New Topic')
    refute_nil topic

    category_ids = topic.category_ids
    assert_equal 2, category_ids.length
    assert_includes category_ids, categories(:category1).id
    assert_includes category_ids, categories(:category2).id
  end

  test 'invalid category is droped' do
    assert_nil Topic.find_by_title('New Topic')
    assert_equal(false, Category.exists?(99999), msg: "don't expect a category to have id 99999")

    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'topic[title]': 'New Topic',
                                       'topic[content]': 'New Content',
                                       'topic[category_ids]': [
                                         categories(:category1).id,
                                         categories(:category2).id,
                                         99999
                                       ] }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['topic']

    topic = Topic.find_by_title('New Topic')
    refute_nil topic

    category_ids = topic.category_ids
    assert_equal 2, category_ids.length
    assert_includes category_ids, categories(:category1).id
    assert_includes category_ids, categories(:category2).id
  end
end
