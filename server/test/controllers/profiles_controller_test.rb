# frozen_string_literal: true
require 'test_helper'

class ProfilesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'profile returns a list of posted topics' do
    get :show, xhr: true, params: { id: 1 }

    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type

    json = JSON.parse(@response.body)

    topics = json['user']['posted_topics']

    assert_kind_of Array, topics
    refute_empty topics
    topics.each do |t|
      assert_equal 1, Topic.find(t['id']).user.id
    end
  end
end
