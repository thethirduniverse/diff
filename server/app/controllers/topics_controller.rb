# frozen_string_literal: true
class TopicsController < ApplicationController
  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:show, :index]

  def index
    topics = Topic.order(created_at: :desc).first(10)
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

  def create
    topic = Topic.new(topic_params)
    topic[:user_id] = current_user.id
    topic.save!

    render json: {
      topic: topic_response(topic)
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

  def topic_params
    params.require(:topic).permit(:title, :content)
  end
end
