# frozen_string_literal: true
require 'test_helper'

class TopicHelperTest < ActionView::TestCase
  test 'has_more is true when it does have more content to load' do
    assert_equal true, Topic.count > TopicHelper::BATCH_SIZE

    res = topics_feed

    assert_equal true, res[:has_more]
    assert_equal BATCH_SIZE, res[:next_offset]
  end

  test 'has_more is false when it does not have more content to load' do
    assert_equal true, Topic.count > TopicHelper::BATCH_SIZE

    res = topics_feed(offset: Topic.count - 1)

    assert_equal false, res[:has_more]
    assert_equal Topic.count, res[:next_offset]
  end

  test 'has_more is true when it does have more content to load for a category' do
    category = Category.find_by_name('Philosophy')
    count = category.topics.count
    assert_equal true, count > TopicHelper::BATCH_SIZE

    res = topics_feed(category_id: category.id)

    assert_equal true, res[:has_more]
    assert_equal BATCH_SIZE, res[:next_offset]
  end

  test 'has_more is false when it does not have more content to load for a category' do
    category = Category.find_by_name('Philosophy')
    count = category.topics.count
    assert_equal true, count > TopicHelper::BATCH_SIZE
    res = topics_feed(category_id: category.id, offset: count - 1)

    assert_equal false, res[:has_more]
    assert_equal count, res[:next_offset]
  end

  # may have false positive
  test 'user_id is respected' do
    res = topics_feed(user_id: 1)

    res[:topics].each do |t|
      assert_equal 1, Topic.find(t[:id]).user.id
    end
  end

  # may have false positive
  test 'category_id is respected' do
    cid = Category.find_by_name('Philosophy').id
    res = topics_feed(category_id: cid)

    res[:topics].each do |t|
      assert_equal cid, t[:categories][0][:id]
    end
  end

  # may have false positive
  test 'user_id and category_id together is respected' do
    cid = Category.find_by_name('Philosophy').id
    res = topics_feed(category_id: cid, user_id: 1)

    res[:topics].each do |t|
      assert_equal 1, Topic.find(t[:id]).user.id
      assert_equal cid, t[:categories][0][:id]
    end
  end

  test 'it respects response type' do
    res = topics_feed
    res2 = topics_feed(response_type: TopicHelper::TOPIC_FEED_RESPONSE_TYPE_SIMPLIFIED)

    refute_nil res[:topics][0][:replies]
    assert_nil res2[:topics][0][:replies]
  end
end
