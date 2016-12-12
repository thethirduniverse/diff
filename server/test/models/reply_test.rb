# frozen_string_literal: true
require 'test_helper'

class ReplyTest < ActiveSupport::TestCase
  setup do
    skip
  end

  test 'topic id cannot be nil or not valid' do
    reply = Reply.new(creator_id: User.first.id,
                      content: 'some content',
                      target_type: :topic)
    assert_equal false, reply.save
    refute_nil reply.errors[:topic]
  end

  test 'reply id can be nil' do
    reply = Reply.new(creator_id: User.first.id,
                      content: 'some content',
                      topic_id: Topic.first.id,
                      target_type: :topic)
    assert_equal true, reply.save
  end

  test 'reply id cannot be invalid' do
    assert_raises ActiveRecord::RecordNotFound do
      Reply.find(999)
    end

    reply = Reply.new(creator_id: User.first.id,
                      content: 'some content',
                      topic_id: Topic.first.id,
                      reply_id: 999,
                      target_type: :reply)
    assert_equal false, reply.save
    refute_nil reply.errors[:parent_reply]
  end

  test 'valid reply is accepted' do
    reply = Reply.new(creator_id: User.first.id,
                      content: 'some content',
                      root_topic_id: Topic.first.id,
                      reply_id: Reply.first.id,
                      target_type: :reply)
    assert_equal true, reply.save
  end
end
