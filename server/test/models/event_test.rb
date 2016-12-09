# frozen_string_literal: true
require 'test_helper'

class ReportTopicEventTest < ActiveSupport::TestCase
  test 'topic id is required when appropraite' do
    e = ReportTopicEvent.new
    assert_equal false, e.save
    refute_nil e.errors[:topic]
    e.topic = Topic.first
    assert_equal true, e.save

    e = UpdateTopicEvent.new
    assert_equal false, e.save
    refute_nil e.errors[:topic]
    e.topic = Topic.first
    assert_equal true, e.save
  end

  test 'reply id is required when appropraite' do
    e = ReportReplyEvent.new
    assert_equal false, e.save
    refute_nil e.errors[:reply]
    e.reply = Reply.first
    assert_equal true, e.save

    e = UpdateReplyEvent.new
    assert_equal false, e.save
    refute_nil e.errors[:reply]
    e.reply = Reply.first
    assert_equal true, e.save
  end

  test 'user id is required when appropraite' do
    e = ReportUserEvent.new
    assert_equal false, e.save
    refute_nil e.errors[:user]
    e.user = User.first
    assert_equal true, e.save
  end

  test 'broadcast event' do
    e = BroadcastEvent.new
    assert_equal false, e.save
    refute_nil e.errors[:content]
    e.content = 'some content'
    assert_equal true, e.save
  end
end
