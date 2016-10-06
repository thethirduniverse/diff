# frozen_string_literal: true
module TopicHelper
  include CategoryHelper

  def topics_feed
    topics = index_topics_query

    {
      topics: topics.map do |topic|
        topic_response topic
      end
    }
  end

  def index_topics_query
    category_id = params[:category_id]

    if category_id
      Category.find(category_id).topics.order(created_at: :desc).first(10)
    else
      Topic.order(created_at: :desc).first(10)
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
