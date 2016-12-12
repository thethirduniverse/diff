# frozen_string_literal: true
class TopicsController < ApplicationController
  include TopicHelper
  include DiffHelper

  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:show, :index]

  def index
    offset = params[:offset]
    category_id = params[:category_id]

    render json: topics_feed(
      offset: offset ? Integer(offset) : 0,
      category_id: category_id
    )
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

    unless topic.save
      render_validation_error topic
      return
    end

    unless create_initial_edit topic
      render_create_edit_error
      return
    end

    render_success topic
  end

  private

  def render_success(topic)
    render json: {
      topic: topic_response(topic)
    }
  end

  def render_create_edit_error
    render json: {
      errors: {
        edit: 'Unable to create initial edit for topic.'
      }
    }, status: 500
  end

  def render_validation_error(topic)
    render json: {
      errors: topic.errors.messages
    }, status: 400
  end

  def create_initial_edit(topic)
    e = TopicEdit.new(user: current_user,
                      topic: topic,
                      version: 0,
                      message: 'Initial Version.',
                      patch: create_patch('', topic.content))
    return e.save
  rescue
    return false
  end

  def add_categories(topic)
    topic.categories << params[:topic][:category_ids].map { |id| Category.find_by_id(id) }.compact if params[:topic][:category_ids]
  end

  def topic_params
    params.require(:topic).permit(:title, :content)
  end
end
