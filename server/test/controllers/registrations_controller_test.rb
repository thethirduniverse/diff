# frozen_string_literal: true
require 'test_helper'

class RegistrationsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  # Test User Sign Up
  test 'user is able to sign up' do
    post :create, xhr: true, params: { 'user[email]': 'new@example.com', 'user[password]': '12345678', 'user[password_confimation]': '12345678' }

    assert_equal 201, @response.status
    refute_nil User.find_by_email('new@example.com')

    json = JSON.parse(@response.body)
    refute_nil json['email']
  end

  test 'user is able to request reset psw' do
    post :request_reset_password, xhr: true, params: { 'email': User.first.email }

    assert_equal 200, @response.status
  end

  test 'user is not able to request reset psw for user that does not exist' do
    post :request_reset_password, xhr: true, params: { 'email': 'notexist@example.com' }

    assert_equal 400, @response.status
    json = JSON.parse(@response.body)
    refute_nil json['errors']
  end
end
