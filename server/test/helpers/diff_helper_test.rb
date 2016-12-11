# frozen_string_literal: true
require 'test_helper'

class DiffHelperTest < ActionView::TestCase
  include DiffHelper

  test 'it correctly generates from empty string' do
    src = ''
    dst = '\nbb\nc\nddssdds'
    patch = create_patch(src, dst).split(/\n/)
    assert_equal '@@ -0,0 +1 @@', patch[-2]
    assert_equal '{+\\nbb\\nc\\nddssdds+}', patch[-1]
  end

  test 'it correctly generates diff' do
    src = 'a\nb\nc'
    dst = '\nbb\nc'
    patch = create_patch(src, dst).split(/\n/)
    assert_equal '@@ -1 +1 @@', patch[-2]
    assert_equal '[-a\\nb\\nc-]{+\\nbb\\nc+}', patch[-1]
  end

  test 'it detects if content not changed' do
    src = 'a\nb\nc'
    assert_raise ContentNotChangedError do
      create_patch(src, src)
    end
  end
end
