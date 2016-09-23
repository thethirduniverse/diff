# frozen_string_literal: true
class TopicsController < ApplicationController
  clear_respond_to
  respond_to :json

  def index
    topics = Topic.first(5)
    render json: {
      topics: topics.map do |topic|
        topic_response topic
      end
    }
  end

  def show
    id = params[:id]

    topic = Topic.find(id)
    render json: {
      topic: topic_response(topic)
    }

  rescue ActiveRecord::RecordNotFound
    head 404, content_type: 'application/json'
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
