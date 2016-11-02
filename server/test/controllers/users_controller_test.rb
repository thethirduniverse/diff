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
end
