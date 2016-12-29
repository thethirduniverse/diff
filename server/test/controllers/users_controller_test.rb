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
    fname = 'Adam'
    lname = 'Mada'
    bio = 'Hi everyone'
    refute_equal fname, adam.first_name
    refute_equal lname, adam.last_name
    refute_equal bio, adam.bio

    put :update, xhr: true, params: {
      'id': adam.id,
      'user[first_name]': fname,
      'user[last_name]': lname,
      'user[bio]': bio
    }
    assert_equal 204, @response.status

    adam.reload
    assert_equal fname, adam.first_name
    assert_equal lname, adam.last_name
    assert_equal bio, adam.bio
  end
end
