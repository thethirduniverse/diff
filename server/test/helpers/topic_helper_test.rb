# frozen_string_literal: true
require 'test_helper'

class PostHelperTest < ActionView::TestCase
  test 'has_more is true when it does have more content to load' do
    assert_equal true, Post.count > PostHelper::BATCH_SIZE

    res = posts_feed

    assert_equal true, res[:has_more]
    assert_equal BATCH_SIZE, res[:next_offset]
  end

  test 'has_more is false when it does not have more content to load' do
    assert_equal true, Post.count > PostHelper::BATCH_SIZE

    res = posts_feed(offset: Post.count - 1)

    assert_equal false, res[:has_more]
    assert_equal Post.count, res[:next_offset]
  end

  test 'has_more is true when it does have more content to load for a category' do
    category = Category.find_by_name('Philosophy')
    count = category.posts.count
    assert_equal true, count > PostHelper::BATCH_SIZE

    res = posts_feed(category_id: category.id)

    assert_equal true, res[:has_more]
    assert_equal BATCH_SIZE, res[:next_offset]
  end

  test 'has_more is false when it does not have more content to load for a category' do
    category = Category.find_by_name('Philosophy')
    count = category.posts.count
    assert_equal true, count > PostHelper::BATCH_SIZE
    res = posts_feed(category_id: category.id, offset: count - 1)

    assert_equal false, res[:has_more]
    assert_equal count, res[:next_offset]
  end

  # may have false positive
  test 'user_id is respected' do
    res = posts_feed(user_id: 1)

    res[:posts].each do |t|
      assert_equal 1, Post.find(t[:id]).creator.id
    end
  end

  # may have false positive
  test 'category_id is respected' do
    cid = Category.find_by_name('Philosophy').id
    res = posts_feed(category_id: cid)

    res[:posts].each do |t|
      assert_equal cid, t[:categories][0][:id]
    end
  end

  # may have false positive
  test 'user_id and category_id together is respected' do
    cid = Category.find_by_name('Philosophy').id
    res = posts_feed(category_id: cid, user_id: 1)

    res[:posts].each do |t|
      assert_equal 1, Post.find(t[:id]).creator.id
      assert_equal cid, t[:categories][0][:id]
    end
  end

  test 'it respects response type' do
    skip
    res = posts_feed
    res2 = posts_feed(response_type: PostHelper::POST_FEED_RESPONSE_TYPE_SIMPLIFIED)

    refute_nil res[:posts][0][:replies]
    assert_nil res2[:posts][0][:replies]
  end
end
