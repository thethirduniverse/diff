# frozen_string_literal: true
require 'test_helper'

class ReportTest < ActiveSupport::TestCase
  test 'post id is required when appropraite' do
    r = PostReport.new(creator: User.first)
    assert_equal false, r.save
    refute_nil r.errors[:post]
    r.post = Post.first
    assert_equal true, r.save
  end

  test 'user id is required when appropraite' do
    r = UserReport.new(creator: User.first)
    assert_equal false, r.save
    refute_nil r.errors[:user]
    r.user = User.second
    assert_equal true, r.save
  end

  test 'creator id is required' do
    r = UserReport.new
    assert_equal false, r.save
    refute_nil r.errors[:creator]
  end
end
