# frozen_string_literal: true
require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  # Test User Sign In
  test 'user is able to sign in' do
    post :create, xhr: true, params: { 'user[email]': 'adam@example.com', 'user[password]': '12345678' }

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['user']
    refute_nil json['newCSRFToken']
  end

  test "user not able to sign in accounts that don't exist" do
    post :create, xhr: true, params: { 'user[email]': 'dontexist@example.com', 'user[password]': '12345678' }

    assert_equal 401, @response.status
  end

  test 'user not able to sign in accounts with wrong password' do
    post :create, xhr: true, params: { 'user[email]': 'adam@example.com', 'user[password]': 'wrongpassword' }

    assert_equal 401, @response.status
  end

  # Test User Sign Out
  test 'user is able to sign out' do
    adam = User.find(1)
    sign_in adam
    post :destroy, xhr: true

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    refute_nil json['newCSRFToken']
  end

  test 'fetch returns empty if not signed in' do
    post :fetch, xhr: true

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal({}, json)
  end

  test 'fetch returns user info if signed in' do
    adam = User.find(1)
    sign_in adam
    post :fetch, xhr: true

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_equal 1, json['user']['id']
  end
end
