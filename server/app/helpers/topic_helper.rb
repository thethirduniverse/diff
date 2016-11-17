# frozen_string_literal: true
module TopicHelper
  include CategoryHelper
  include ReplyHelper

  BATCH_SIZE = 10

  def topics_feed(offset = 0)
    topics = index_topics_query offset
    has_more = topics.length > BATCH_SIZE

    topics = topics[0..BATCH_SIZE - 1] # slice indexes are inclusive
    {
      topics: topics.map do |topic|
        topic_response topic
      end,
      has_more: has_more,
      next_offset: offset + topics.length
    }
  end

  def index_topics_query(offset)
    category_id = params[:category_id]

    if category_id
      Category.find(category_id).topics.order(created_at: :desc).offset(offset).first(BATCH_SIZE + 1)
    else
      Topic.order(created_at: :desc).offset(offset).first(BATCH_SIZE + 1)
    end
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
