# frozen_string_literal: true
require 'test_helper'

class EditsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'it should display edits of a post' do
    u = User.first
    p = Post.create(title: 'title', content: 'content')
    assert_equal true, p.errors.empty?
    e1 = Edit.create(post: p, user: u, version: 0, message: 'm0', patch: 'p0')
    assert_equal true, e1.errors.empty?
    e2 = Edit.create(post: p, user: u, version: 1, message: 'm1', patch: 'p1')
    assert_equal true, e2.errors.empty?
    e3 = Edit.create(post: p, user: u, version: 2, message: 'm2', patch: 'p2')
    assert_equal true, e3.errors.empty?

    get :show, xhr: true, params: { post_id: p.id }
    assert_equal 200, @response.status
    assert_equal 'application/json', @response.content_type
    json = JSON.parse(@response.body)
    assert_equal 3, json['edits'].length
    assert_equal 2, json['edits'][0]['version']
    assert_equal 1, json['edits'][1]['version']
    assert_equal 0, json['edits'][2]['version']
  end
end
