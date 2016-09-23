# frozen_string_literal: true
class TopicsController < ApplicationController
  def index
    topics = Topic.first(5)
    render json: {
      topics: topics.map do |topic|
        topic_response topic
      end
    }
  end

  private

  def topic_response(t)
    {
      id: t.id,
      title: t.title,
      content: t.content
    }
  end
end
