# frozen_string_literal: true
require 'test_helper'

class ProfilesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'it returns user profile if user exist' do
    post :show, xhr: true, params: { id: 1 }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    assert_equal 1, json['user']['id']
  end

  test 'returns 404 if user does not exist' do
    post :show, xhr: true, params: { id: 999 }

    assert_equal 404, @response.status
    assert_equal 'application/json', @response.content_type
  end
end
