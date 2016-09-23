# frozen_string_literal: true
require 'test_helper'

class TopicsControllerTest < ActionController::TestCase
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
end
