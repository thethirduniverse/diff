# frozen_string_literal: true
require 'test_helper'

class RegistrationsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  # Test User Sign Up
  test 'user is not able to sign up without code' do
    post :create, xhr: true, params: { 'user[email]': 'new@example.com', 'user[password]': '12345678', 'user[password_confimation]': '12345678' }

    assert_equal 400, @response.status
    json = JSON.parse(@response.body)
    refute_nil json['errors']['invitation_code']
  end

  test 'user is able to sign up' do
    user = User.first
    sign_in user
    post :generate_invitation_code, xhr: true
    code = JSON.parse(@response.body)['code']
    sign_out user

    post :create, xhr: true, params: {
      'user[email]': 'new@example.com',
      'user[password]': '12345678',
      'user[password_confimation]': '12345678',
      'invitation_code': code
    }

    assert_equal 201, @response.status
    new_user = User.find_by_email('new@example.com')
    refute_nil new_user
    assert_equal user.id, new_user.invited_by.id,

                 json = JSON.parse(@response.body)
    refute_nil json['email']
  end

  test 'same code cannot be used twice' do
    user = User.first
    sign_in user
    post :generate_invitation_code, xhr: true
    code = JSON.parse(@response.body)['code']
    sign_out user

    post :create, xhr: true, params: {
      'user[email]': 'new@example.com',
      'user[password]': '12345678',
      'user[password_confimation]': '12345678',
      'invitation_code': code
    }
    assert_equal 201, @response.status

    post :create, xhr: true, params: {
      'user[email]': 'new2@example.com',
      'user[password]': '12345678',
      'user[password_confimation]': '12345678',
      'invitation_code': code
    }
    assert_equal 400, @response.status

    json = JSON.parse(@response.body)
    refute_nil json['errors']['invitation_code']
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

  test 'user can generate invitation code' do
    user = User.first
    sign_in user

    post :generate_invitation_code, xhr: true

    assert_equal 200, @response.status
    json = JSON.parse(@response.body)
    refute_nil json['code']
  end

  test 'user cannot generate more than 10 unused invitation code' do
    user = User.first
    sign_in user

    10.times do
      post :generate_invitation_code, xhr: true
      assert_equal 200, @response.status
      json = JSON.parse(@response.body)
      refute_nil json['code']
    end

    post :generate_invitation_code, xhr: true
    assert_equal 200, @response.status
    json = JSON.parse(@response.body)
    refute_nil json['error']
    refute_nil json['codes']
    assert_equal 10, json['codes'].length
  end
end
