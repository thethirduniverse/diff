# frozen_string_literal: true
require 'test_helper'

class ProfilesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'profile returns a list of posted topics' do
    get :show, xhr: true, params: { id: 1 }

    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type

    json = JSON.parse(@response.body)

    posts = json['user']['posted_posts']

    assert_kind_of Hash, posts
    refute_nil posts['has_more']
    refute_nil posts['next_offset']
    refute_nil posts['posts']
  end
end
