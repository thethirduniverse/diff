# frozen_string_literal: true
require 'test_helper'
class UsersControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  def teardown
    clear_test_files
  end

  test 'user can set avatar' do
    adam = User.find(1)
    sign_in adam
    assert_equal false, adam.avatar.present?
    post :update_avatar, xhr: true, params: { 'user[avatar]': fixture_file_upload('images/sample.png', 'image/png') }

    assert_equal 200, @response.status

    adam.reload
    assert_equal true, adam.avatar.present?
  end

  test 'user can update name and bio' do
    adam = User.find(1)
    sign_in adam
    name = 'Adam Mada'
    bio = 'Hi everyone'
    refute_equal name, adam.name
    refute_equal bio, adam.bio

    put :update, xhr: true, params: {
      'id': adam.id,
      'user[name]': name,
      'user[bio]': bio
    }
    assert_equal 204, @response.status

    adam.reload
    assert_equal name, adam.name
    assert_equal bio, adam.bio
  end
end
