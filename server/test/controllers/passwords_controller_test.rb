# frozen_string_literal: true
require 'test_helper'

class PasswordsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  test 'invalid token is rejected' do
    post :update, xhr: true, params: { 'user[password]': '12345678', 'user[password_confirmation]': '12345678', 'user[reset_password_token]': 'doesnotexist' }

    assert_equal 422, @response.status

    json = JSON.parse(@response.body)
    refute_nil json['errors']['reset_password_token']
  end

  test 'user can reset password' do
    user = User.first
    epsw = Devise::Encryptor.digest(User, 'newpassword')
    refute_equal epsw, user.encrypted_password

    post :create, xhr: true, params: { 'user[email]': user.email }
    assert_equal 201, @response.status
  end
end
