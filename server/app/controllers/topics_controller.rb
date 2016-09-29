# frozen_string_literal: true
class TopicsController < ApplicationController
  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:show, :index]

  def index
    topics = index_topics_query

    render json: {
      topics: topics.map do |topic|
        topic_response topic
      end
    }
  end

  def show
    id = params[:id]

    topic = Topic.find(id)
    topic.update(view: topic.view + 1)
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

  def category_response(c)
    {
      id: c.id,
      name: c.name
    }
  end

  def topic_params
    params.require(:topic).permit(:title, :content)
  end
end
