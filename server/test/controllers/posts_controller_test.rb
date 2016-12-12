# frozen_string_literal: true
require 'test_helper'

# rubocop:disable ClassLength
class PostsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers
  include PostHelper

  # Index
  test 'index returns a list of topics' do
    post :index, xhr: true

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_kind_of Array, json['posts']
  end

  test 'index respects category preferences' do
    category = Category.first
    post :index, xhr: true, params: { category_id: category.id }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_kind_of Array, json['posts']
    json['posts'].each do |t|
      assert_includes t['categories'], 'id' => category.id,
                                       'name' => category.name
    end
  end

  # Show
  test 'show returns a single article if that article exists' do
    get :show, xhr: true, params: { id: 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal 1, json['post']['id']
  end

  test 'show returns 404 if that article does not exist' do
    get :show, xhr: true, params: { id: 999 }

    assert_equal 404, @response.status
    assert_equal 'application/json', @response.content_type
  end

  test 'show increments topic view count' do
    view_before = Post.find(1).view
    get :show, xhr: true, params: { id: 1 }

    assert_equal view_before + 1, Post.find(1).view
  end

  test 'show returns a topics with categores' do
    get :show, xhr: true, params: { id: 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    refute_nil json['post']['categories'][0]['id']
    refute_nil json['post']['categories'][1]['id']
    assert_equal 'Philosophy', json['post']['categories'][0]['name']
    assert_equal 'Metaphysics', json['post']['categories'][1]['name']
  end

  test 'show returns a topic with replies' do
    skip
    get :show, xhr: true, params: { id: 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal 3, json['post']['replies'].length
  end

  # Create
  test 'logged in user can post new topic' do
    assert_nil Post.find_by_title('New Post')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content' }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['post']

    post = Post.find_by_title('New Post')
    refute_nil post
    assert_equal 1, post.creator_id
  end

  test 'logged out user can not post new topic' do
    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content' }

    assert_equal 401, @response.status
    assert_nil Post.find_by_title('New Post')
  end

  test 'cannot post without content' do
    assert_nil Post.find_by_title('New Post')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'post[title]': 'New Post' }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    refute_nil json['errors']
    assert_equal ['can\'t be blank'], json['errors']['content']

    assert_nil Post.find_by_title('New Post')
  end

  test 'cannot post without title' do
    assert_nil Post.find_by_content('New Content')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'post[content]': 'New Content' }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    refute_nil json['errors']
    assert_equal ['can\'t be blank'], json['errors']['title']

    topic = Post.find_by_content('New Content')
    assert_nil topic
  end

  test 'user can specify an array of category ids' do
    assert_nil Post.find_by_title('New Post')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content',
                                       'post[category_ids]': [
                                         categories(:category1).id,
                                         categories(:category2).id
                                       ] }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['post']

    topic = Post.find_by_title('New Post')
    refute_nil topic

    category_ids = topic.category_ids
    assert_equal 2, category_ids.length
    assert_includes category_ids, categories(:category1).id
    assert_includes category_ids, categories(:category2).id
  end

  test 'invalid category is droped' do
    assert_nil Post.find_by_title('New Post')
    assert_equal(false, Category.exists?(99999), msg: "don't expect a category to have id 99999")

    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content',
                                       'post[category_ids]': [
                                         categories(:category1).id,
                                         categories(:category2).id,
                                         99999
                                       ] }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['post']

    topic = Post.find_by_title('New Post')
    refute_nil topic

    category_ids = topic.category_ids
    assert_equal 2, category_ids.length
    assert_includes category_ids, categories(:category1).id
    assert_includes category_ids, categories(:category2).id
  end

  test 'it creates inital edit' do
    skip
    adam = User.find(1)
    sign_in adam

    assert_nil PostEdit.find_by_user_id(1)
    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content',
                                       'post[category_ids]': [
                                         categories(:category1).id
                                       ] }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['topic']

    edit = PostEdit.find_by_user_id(1)
    refute_nil edit
    assert_equal json['topic']['id'], edit.topic.id
    assert_equal 0, edit.version
    assert_equal 1, edit.user.id
    refute_empty edit.message
    refute_empty edit.patch
  end
end