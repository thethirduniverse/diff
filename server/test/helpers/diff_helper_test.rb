# frozen_string_literal: true
require 'test_helper'

class DiffHelperTest < ActionView::TestCase
  include DiffHelper
  require_relative 'diff_helper_test_seed_content.rb'

  # rubocop:disable LineLength
  test 'it correctly generates from empty string' do
    src = ''
    dst = '\nbb\nc\nddssdds'
    patch = create_patch(src, dst)
    assert_equal "diff --git src dst\nindex e69de29..551ec3e 100644\n--- src\n+++ dst\n@@ -0,0 +1 @@\n+\\nbb\\nc\\nddssdds\n\\ No newline at end of file\n", patch
  end

  test 'it correctly generates diff' do
    src = 'a\nb\nc'
    dst = '\nbb\nc'
    patch = create_patch(src, dst)
    assert_equal "diff --git src dst\nindex ae7ef23..9af36c4 100644\n--- src\n+++ dst\n@@ -1 +1 @@\n-a\\nb\\nc\n\\ No newline at end of file\n+\\nbb\\nc\n\\ No newline at end of file\n", patch
  end
  # rubocop:enable LineLength

  test 'it detects if content not changed' do
    src = 'a\nb\nc'
    assert_raise ContentNotChangedError do
      create_patch(src, src)
    end
  end

  # rubocop:disable Metrics/BlockLength
  test 'it can revert a post to a past version' do
    post = Post.create(title: 'title', content: DiffHelperTestSeedContent::M4)
    assert_equal true, post.persisted?
    assert_equal true, Edit.create(
      post: post,
      user: User.first,
      message: 'message',
      version: 0,
      patch: create_patch('', DiffHelperTestSeedContent::M1)
    ).persisted?
    assert_equal true, Edit.create(
      post: post,
      user: User.first,
      message: 'message',
      version: 1,
      patch: create_patch(DiffHelperTestSeedContent::M1, DiffHelperTestSeedContent::M2)
    ).persisted?
    assert_equal true, Edit.create(
      post: post,
      user: User.first,
      message: 'message',
      version: 2,
      patch: create_patch(DiffHelperTestSeedContent::M2, DiffHelperTestSeedContent::M3)
    ).persisted?
    assert_equal true, Edit.create(
      post: post,
      user: User.first,
      message: 'message',
      version: 3,
      patch: create_patch(DiffHelperTestSeedContent::M3, DiffHelperTestSeedContent::M4)
    ).persisted?

    assert_equal DiffHelperTestSeedContent::M1, post_with_version(post.id, 0)
    assert_equal DiffHelperTestSeedContent::M2, post_with_version(post.id, 1)
    assert_equal DiffHelperTestSeedContent::M3, post_with_version(post.id, 2)
    assert_equal DiffHelperTestSeedContent::M4, post_with_version(post.id, 3)
  end
  # rubocop:enable Metrics/BlockLength
end
