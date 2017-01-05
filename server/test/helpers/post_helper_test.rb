# frozen_string_literal: true
require 'test_helper'

class PostHelperTest < ActionView::TestCase
  include FeedSpecification

  test 'has_more is true when it does have more content to load' do
    assert_equal true, Post.count > 10

    spec = NewestFeedSpecification.new(10)
    res = posts_feed(spec)

    assert_equal true, res[:has_more]
    assert_equal 10, res[:next_offset]
  end

  test 'has_more is false when it does not have more content to load' do
    assert_equal true, Post.count > 10

    spec = NewestFeedSpecification.new(10, offset: Post.count - 1)
    res = posts_feed(spec)

    assert_equal false, res[:has_more]
    assert_equal Post.count, res[:next_offset]
  end

  test 'has_more is true when it does have more content to load for a category' do
    category = Category.find_by_name('Philosophy')
    count = category.posts.count
    assert_equal true, count > 10

    spec = CategoryFeedSpecification.new(10, category.id)
    res = posts_feed(spec)

    assert_equal true, res[:has_more]
    assert_equal 10, res[:next_offset]
  end

  test 'has_more is false when it does not have more content to load for a category' do
    category = Category.find_by_name('Philosophy')
    count = category.posts.count
    assert_equal true, count > 10

    spec = CategoryFeedSpecification.new(10, category.id, offset: count - 1)
    res = posts_feed(spec)

    assert_equal false, res[:has_more]
    assert_equal count, res[:next_offset]
  end

  # may have false positive
  test 'user_id is respected' do
    spec = UserFeedSpecification.new(10, 1)
    res = posts_feed(spec)

    res[:posts].each do |t|
      assert_equal 1, Post.find(t[:id]).creator.id
    end
  end

  # may have false positive
  test 'category_id is respected' do
    cid = Category.find_by_name('Philosophy').id
    spec = CategoryFeedSpecification.new(10, cid)
    res = posts_feed(spec)

    res[:posts].each do |t|
      assert_equal cid, t[:categories][0][:id]
    end
  end

  # may have false positive
  test 'user_id and category_id together is respected' do
    cid = Category.find_by_name('Philosophy').id
    spec = UserCategorySpecification.new(10, 1, cid)
    res = posts_feed(spec)

    res[:posts].each do |t|
      assert_equal 1, Post.find(t[:id]).creator.id
      assert_equal cid, t[:categories][0][:id]
    end
  end

  test 'it respects response type' do
    spec = NewestFeedSpecification.new(10)
    res = posts_feed(spec)
    res2 = posts_feed(spec, response_type: PostHelper::POST_FEED_RESPONSE_TYPE_SIMPLIFIED)

    refute_nil res[:posts][0][:posts]
    assert_nil res2[:posts][0][:posts]
  end
end
