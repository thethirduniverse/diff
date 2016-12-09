# frozen_string_literal: true
require 'test_helper'

class EventPostingTest < ActionView::TestCase
  test 'broadcast' do
    assert_nil BroadcastEvent.find_by_content('some broadcast')
    EventPosting.post_broadcast('some broadcast')
    refute_nil BroadcastEvent.find_by_content('some broadcast')
  end
end
