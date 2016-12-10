# frozen_string_literal: true
require 'test_helper'

class EventPostingTest < ActionView::TestCase
  include NotificationHelper

  test 'broadcast' do
    user = User.first
    assert_empty notifications(user)[:notifications]
    assert_nil BroadcastEvent.find_by_content('some broadcast')

    EventPosting.post_broadcast('some broadcast')

    refute_nil BroadcastEvent.find_by_content('some broadcast')

    ns = notifications(user)[:notifications]
    assert_equal 1, ns.length
    assert_equal 'some broadcast', ns[0][:event][:content]
  end
end
