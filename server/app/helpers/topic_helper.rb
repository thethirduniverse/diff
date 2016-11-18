# frozen_string_literal: true
module TopicHelper
  include CategoryHelper
  include ReplyHelper

  BATCH_SIZE = 10

  TOPIC_FEED_RESPONSE_TYPE_DEFAULT = :default
  TOPIC_FEED_RESPONSE_TYPE_SIMPLIFIED = :simplified

  def topics_feed(offset: 0,
                  category_id: nil,
                  user_id: nil,
                  response_type: TOPIC_FEED_RESPONSE_TYPE_DEFAULT)

    topics = index_topics_query(offset, category_id, user_id)

    topic_feed_response(topics, response_type, offset)
  end

  def index_topics_query(offset, category_id, user_id)
    base =
      if category_id && user_id
        User.find(user_id).topics.joins(:topics_categories).where(topics_categories: { category_id: category_id })
      elsif user_id
        User.find(user_id).topics
      elsif category_id
        Category.find(category_id).topics
      else
        Topic
      end

    base.order(created_at: :desc).offset(offset).first(BATCH_SIZE + 1)
  end

  def topic_feed_response(topics, response_type, offset)
    has_more = topics.length > BATCH_SIZE
    topics = topics[0..BATCH_SIZE - 1] # slice indexes are inclusive

    {
      topics: topics.map do |topic|
        case response_type
        when TOPIC_FEED_RESPONSE_TYPE_SIMPLIFIED
          topic_response_simplified topic
        else
          topic_response topic
        end
      end,
      has_more: has_more,
      next_offset: offset + topics.length
    }
  end

  def topic_response(t)
    {
      id: t.id,
      title: t.title,
      content: t.content,
      view: t.view,
      categories: t.categories.map do |c|
        category_response c
      end,
      replies: t.replies.map do |r|
        reply_response r
      end
    }
  end

  def topic_response_simplified(t)
    {
      id: t.id,
      title: t.title,
      view: t.view,
      categories: t.categories.map do |c|
        category_response c
      end
    }
  end
end
