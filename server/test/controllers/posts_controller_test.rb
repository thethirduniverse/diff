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
    post :index, xhr: true, params: { type: 'category', category_id: category.id }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_kind_of Array, json['posts']
    json['posts'].each do |t|
      assert_includes t['categories'], 'id' => category.id,
                                       'name' => category.name
    end
  end

  test 'index respects other' do
    post :index, xhr: true, params: { type: 'other' }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_kind_of Array, json['posts']
    json['posts'].each do |t|
      assert_equal [], t['categories']
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
    get :show, xhr: true, params: { id: 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal 3, json['post']['posts'].length
  end

  test 'show returns recursive result to root' do
    adam = User.find(1)
    sign_in adam

    post :create, xhr: true, params: { 'post[title]': 'Child',
                                       'post[content]': 'Child Content',
                                       'post[parent_post_id]': 1 }
    assert_equal 200, @response.status
    child_id = JSON.parse(@response.body)['post']['id']

    post :create, xhr: true, params: { 'post[title]': 'Grandchild',
                                       'post[content]': 'Grandchild Content',
                                       'post[parent_post_id]': child_id }
    assert_equal 200, @response.status
    grandchild_id = JSON.parse(@response.body)['post']['id']

    get :show, xhr: true, params: { id: grandchild_id }

    assert_equal 200, @response.status
    json = JSON.parse(@response.body)
    assert_equal 1, json['post']['id']
    assert_equal child_id, json['post']['posts'][0]['id']
    assert_equal grandchild_id, json['post']['posts'][0]['posts'][0]['id']
  end

  test 'show only returns single post if single is true' do
    adam = User.find(1)
    sign_in adam

    post :create, xhr: true, params: { 'post[title]': 'Child',
                                       'post[content]': 'Child Content',
                                       'post[parent_post_id]': 1 }
    assert_equal 200, @response.status
    child_id = JSON.parse(@response.body)['post']['id']

    post :create, xhr: true, params: { 'post[title]': 'Grandchild',
                                       'post[content]': 'Grandchild Content',
                                       'post[parent_post_id]': child_id }
    assert_equal 200, @response.status
    grandchild_id = JSON.parse(@response.body)['post']['id']

    get :show, xhr: true, params: { id: grandchild_id, single_post: true }

    assert_equal 200, @response.status
    json = JSON.parse(@response.body)
    assert_equal grandchild_id, json['post']['id']
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

  # reply functions
  test 'it can have a valid parent post' do
    assert_nil Post.find_by_content('New Content')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: {
      'post[content]': 'New Content',
      'post[parent_post_id]': Post.find(1).id
    }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status

    post = Post.find(json['post']['id'])
    refute_nil post
    assert_equal 1, post.parent_post.id
  end

  test 'parent post id need to be valid' do
    assert_nil Post.find_by_content('New Content')
    adam = User.find(1)
    sign_in adam
    assert_nil Post.find_by_id(999)
    post :create, xhr: true, params: {
      'post[content]': 'New Content',
      'post[parent_post_id]': 999
    }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    refute_nil json['errors']['parent_post']
  end

  test 'the root parent is properly set' do
    assert_nil Post.find_by_content('New Content')
    adam = User.find(1)
    sign_in adam
    post :create, xhr: true, params: {
      'post[content]': 'New Content',
      'post[parent_post_id]': Post.find(1).id
    }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status

    p = Post.find(json['post']['id'])
    refute_nil p
    assert_equal 1, p.parent_post.id
    assert_equal 1, p.root_post.id

    post :create, xhr: true, params: {
      'post[content]': 'New Content',
      'post[parent_post_id]': p.id
    }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status

    p2 = Post.find(json['post']['id'])
    refute_nil p2
    assert_equal p.id, p2.parent_post.id
    assert_equal 1, p2.root_post.id
  end

  # update
  test 'user can make update' do
    adam = User.find(1)
    sign_in adam

    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content',
                                       'post[category_ids]': [
                                         categories(:category1).id
                                       ] }
    json = JSON.parse(@response.body)
    assert_equal 200, @response.status

    p = Post.find(json['post']['id'])
    refute_nil p
    assert_equal 1, Edit.where(post_id: p.id).count

    patch :update, xhr: true, params: {
      'id': p.id,
      'message': 'random edit',
      'post[content]': 'Some New Content'
    }

    assert_equal 200, @response.status

    p.reload
    assert_equal p.content, 'Some New Content'
    assert_equal 2, Edit.where(post_id: p.id).count
    refute_nil Edit.find_by_message('random edit')
    assert_equal 'random edit', p.last_edit.message
  end

  test 'update must have a different content' do
    adam = User.find(1)
    sign_in adam

    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content',
                                       'post[category_ids]': [
                                         categories(:category1).id
                                       ] }
    json = JSON.parse(@response.body)
    assert_equal 200, @response.status

    p = Post.find(json['post']['id'])
    refute_nil p
    assert_equal 1, Edit.where(post_id: p.id).count

    patch :update, xhr: true, params: {
      'id': p.id,
      'message': 'random edit',
      'post[content]': 'New Content'
    }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    refute_nil json['errors']['content']
  end

  test 'new content must not be blank' do
    adam = User.find(1)
    sign_in adam

    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content',
                                       'post[category_ids]': [
                                         categories(:category1).id
                                       ] }
    json = JSON.parse(@response.body)
    assert_equal 200, @response.status

    p = Post.find(json['post']['id'])
    refute_nil p
    assert_equal 1, Edit.where(post_id: p.id).count

    patch :update, xhr: true, params: {
      'id': p.id,
      'message': 'random edit',
      'post[content]': ''
    }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    refute_nil json['errors']['content']
  end

  test 'commit message must be set' do
    adam = User.find(1)
    sign_in adam

    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content',
                                       'post[category_ids]': [
                                         categories(:category1).id
                                       ] }
    json = JSON.parse(@response.body)
    assert_equal 200, @response.status

    p = Post.find(json['post']['id'])
    refute_nil p
    assert_equal 1, Edit.where(post_id: p.id).count

    patch :update, xhr: true, params: {
      'id': p.id,
      'message': '',
      'post[content]': 'Content Changed'
    }

    json = JSON.parse(@response.body)
    assert_equal 400, @response.status
    refute_nil json['errors']['message']
  end

  # edit handling

  test 'it creates inital edit' do
    adam = User.find(1)
    sign_in adam

    assert_nil Edit.find_by_user_id(1)
    post :create, xhr: true, params: { 'post[title]': 'New Post',
                                       'post[content]': 'New Content',
                                       'post[category_ids]': [
                                         categories(:category1).id
                                       ] }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['post']

    edit = Edit.find_by_user_id(1)
    refute_nil edit
    assert_equal json['post']['id'], edit.post.id
    assert_equal 0, edit.version
    assert_equal 1, edit.user.id
    refute_empty edit.message
    refute_empty edit.patch
  end
end
