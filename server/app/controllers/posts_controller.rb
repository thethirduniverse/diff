# frozen_string_literal: true
class PostsController < ApplicationController
  include PostHelper
  include DiffHelper

  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:show, :index]

  def index
    offset = params[:offset]
    category_id = params[:category_id]

    render json: posts_feed(
      offset: offset ? Integer(offset) : 0,
      category_id: category_id
    )
  end

  def show
    id = params[:id]

    post = Post.find(id)
    post.update(view: post.view + 1)
    render json: {
      post: post_response(post)
    }

  rescue ActiveRecord::RecordNotFound
    head 404, content_type: 'application/json'
  end

  def create
    post = Post.new(post_params)
    post[:creator_id] = current_user.id
    add_categories post

    unless post.save
      render_validation_error post
      return
    end

    unless create_initial_edit post
      render_create_edit_error
      return
    end

    render_success post
  end

  private

  def render_success(post)
    render json: {
      post: post_response(post)
    }
  end

  def render_create_edit_error
    render json: {
      errors: {
        edit: 'Unable to create initial edit for post.'
      }
    }, status: 500
  end

  def render_validation_error(post)
    render json: {
      errors: post.errors.messages
    }, status: 400
  end

  def create_initial_edit(_post)
    return true
    # e = TopicEdit.new(user: current_user,
    #                  post: post,
    #                  version: 0,
    #                  message: 'Initial Version.',
    #                  patch: create_patch('', post.content))
    # return e.save
  rescue
    return false
  end

  def add_categories(post)
    post.categories << params[:post][:category_ids].map { |id| Category.find_by_id(id) }.compact if params[:post][:category_ids]
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
