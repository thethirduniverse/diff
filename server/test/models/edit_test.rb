# frozen_string_literal: true
require 'test_helper'

class EditTest < ActiveSupport::TestCase
  test 'it requires user' do
    e = Edit.new(version: 0, message: 'message', patch: 'patch')
    assert_equal false, e.save
    refute_nil e.errors[:user]
  end

  test 'it requires version' do
    e = Edit.new(message: 'message', patch: 'patch')
    assert_equal false, e.save
    refute_nil e.errors[:version]
  end

  test 'it requires correct version' do
    e = Edit.new(version: -2, message: 'message', patch: 'patch')
    assert_equal false, e.save
    refute_nil e.errors[:version]
  end

  test 'it requires message' do
    e = Edit.new(version: -2, message: '  ', patch: 'patch')
    assert_equal false, e.save
    refute_nil e.errors[:message]
  end

  test 'it requires patch' do
    e = Edit.new(version: -2, message: 'message', patch: '  ')
    assert_equal false, e.save
    refute_nil e.errors[:message]
  end

  test 'topic edit requires topic' do
    e = TopicEdit.new(user: User.first, version: 1, message: 'message', patch: 'patch')
    assert_equal false, e.save
    refute_nil e.errors[:topic]
    e.topic = Topic.first
    assert_equal true, e.save
  end

  test 'reply edit requires topic' do
    e = ReplyEdit.new(user: User.first, version: 1, message: 'message', patch: 'patch')
    assert_equal false, e.save
    refute_nil e.errors[:reply]
    e.reply = Reply.first
    assert_equal true, e.save
  end
end
