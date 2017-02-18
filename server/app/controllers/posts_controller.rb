# frozen_string_literal: true
class PostsController < ApplicationController
  include PostHelper
  include PostRenderHelper
  include DiffHelper
  include FeedSpecification

  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:show, :index, :replies]

  def index
    type = params[:type]
    offset = params[:offset] ? Integer(params[:offset]) : 0
    category_id = params[:category_id]

    spec = case type
           when 'category'
             CategoryFeedSpecification.new(10, category_id, offset: offset)
           when 'other'
             OtherFeedSpecification.new(10, offset: offset)
           else
             NewestFeedSpecification.new(10, offset: offset)
           end

    render json: posts_feed(spec)
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
    id = params[:post_id]

    render json: {
      id: id,
      posts: Post.find(id).posts.map do |post|
        post_reply_response(post, current_user: current_user)
      end
    }
  end

  def create
    post = new_post_from_params

    edit = create_edit_and_render_errors('Initial Edit.', post, '', post.content)
    return unless edit

    post.last_edit = edit
    Post.transaction do
      update_parent_reply_count(post)
      post.save!
    end
    render_post post

  rescue ActiveRecord::RecordInvalid => exception
    handle_transaction_record_invalid_exception(exception, post)
  end

  # rubocop:disable Metrics/AbcSize
  def update
    post = Post.find(params[:id])
    new_content = params[:post][:content]

    # may return false
    edit = create_edit_and_render_errors(params[:message], post, post.content, new_content)
    return unless edit

    post.content = new_content
    post.last_edit = edit

    Post.transaction do
      post.save!
    end
    render_post post

  rescue ActiveRecord::RecordInvalid => exception
    handle_transaction_record_invalid_exception(exception, post)
  end
  # rubocop:enable Metrics/AbcSize

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

  def new_post_from_params
    if params[:post][:parent_post_id].blank?
      create_root_post
    else
      create_reply_post
    end
  end

  def add_categories(post)
    post.categories << params[:post][:category_ids].map { |id| Category.find_by_id(id) }.compact if params[:post][:category_ids]
  end

  def handle_transaction_record_invalid_exception(exception, post)
    if exception.record == post.parent_post
      render_error :parent_post, exception.record.errors
    else
      render_validation_error exception.record
    end
  end
end
