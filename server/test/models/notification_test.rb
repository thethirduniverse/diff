# frozen_string_literal: true
require 'test_helper'

class NotificationTest < ActiveSupport::TestCase
  # rubocop:disable Metrics/BlockLength
  test 'basic validations' do
    e = BroadcastEvent.create!(content: 'test')
    n = Notification.new(
      event: e,
      user: User.first,
      count: 0,
      status: :not_viewed
    )
    n.save!

    assert_nil BroadcastEvent.find_by_id(9999)
    n = Notification.new(
      event_id: 9999,
      user: User.first,
      count: 0,
      status: :not_viewed
    )
    refute_equal true, n.save

    assert_nil User.find_by_id(9999)
    e = BroadcastEvent.create!(content: 'test')
    n = Notification.new(
      event: e,
      user_id: 9999,
      count: 0,
      status: :not_viewed
    )
    refute_equal true, n.save

    e = BroadcastEvent.create!(content: 'test')
    n = Notification.new(
      event: e,
      user: User.first,
      count: -1,
      status: :not_viewed
    )
    refute_equal true, n.save
  end
  # rubocop:enable Metrics/BlockLength
end
