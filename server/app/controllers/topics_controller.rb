# frozen_string_literal: true
class TopicsController < ApplicationController
  include TopicHelper

  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:show, :index]

  def index
    render json: topics_feed
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
    add_categories topic
    if topic.valid?
      topic.save!
      render json: {
        topic: topic_response(topic)
      }
    else
      render json: {
        errors: topic.errors.messages
      }, status: 400
    end
  end

  private

  def add_categories(topic)
    topic.categories << params[:topic][:category_ids].map { |id| Category.find_by_id(id) }.compact if params[:topic][:category_ids]
  end

  def topic_params
    params.require(:topic).permit(:title, :content)
  end
end
