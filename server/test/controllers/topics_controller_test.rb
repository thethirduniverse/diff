# frozen_string_literal: true
require 'test_helper'

class TopicsControllerTest < ActionController::TestCase
  test 'index returns a list of topics' do
    post :index, xhr: true

    json = JSON.parse(@response.body)
    assert_equal 200, @response.status
    assert_kind_of Array, json['topics']
  end
end
