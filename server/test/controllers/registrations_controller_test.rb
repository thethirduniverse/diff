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
  end
end
