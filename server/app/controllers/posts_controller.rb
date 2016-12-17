# frozen_string_literal: true
class PostsController < ApplicationController
  include PostHelper
  include PostRenderHelper
  include DiffHelper

  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:show, :index, :replies]

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
    if params[:single_post]
      render_post post
    else
      render_to_root post
    end

  rescue ActiveRecord::RecordNotFound
    head 404, content_type: 'application/json'
  end

  def replies
    id = params[:id]

    render json: {
      id: id,
      posts: Post.find(id).posts.map do |post|
        post_reply_response post
      end
    }
  end

  def create
    post = if params[:post][:parent_post_id].blank?
             create_root_post
           else
             create_reply_post
           end

    unless post.valid?
      render_validation_error post
      return
    end

    return unless create_edit_and_render_errors('Initial Edit.', post, '', post.content)

    post.save!
    render_post post
  end

  def update
    post = Post.find(params[:id])

    old_content = post.content
    new_content = params[:post][:content]
    post.content = new_content

    unless post.valid?
      render_validation_error post
      return
    end

    return unless create_edit_and_render_errors(params[:message], post, old_content, new_content)

    post.save!
    render json: {}, status: 200
  end

  private

  def create_root_post
    ps = params.require(:post).permit(:title, :content)
    ps[:creator_id] = current_user.id

    post = Post.new(ps)
    add_categories post

    post
  end

  def create_reply_post
    ps = params.require(:post).permit(:content, :parent_post_id)
    ps[:creator_id] = current_user.id

    parent = Post.find_by_id(ps[:parent_post_id])

    unless parent.nil?
      ps[:root_post_id] = if parent.root_post_id.nil?
                            parent.id
                          else
                            parent.root_post_id
                          end
    end

    Post.new(ps)
  end

  def add_categories(post)
    post.categories << params[:post][:category_ids].map { |id| Category.find_by_id(id) }.compact if params[:post][:category_ids]
  end
end
