# frozen_string_literal: true
require 'test_helper'

class ReportTopicEventTest < ActiveSupport::TestCase
  test 'report id should be valid' do
    r = UserReport.new(user: User.first, creator: User.second)
    r.save!

    e = ReportEvent.new
    assert_equal false, e.save
    refute_nil e.errors[:report]
    e.report = r
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
