# frozen_string_literal: true
module PostHelper
  include PostRenderHelper
  include PostResponseHelper
  include CategoryHelper
  include DiffHelper

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

  def posts_feed(specification,
                 response_type: PostResponseHelper::POST_FEED_RESPONSE_TYPE_DEFAULT)
    posts = specification.posts
    has_more = posts.length > specification.batch_size
    posts = posts[0..specification.batch_size - 1] # slice indexes are inclusive

    {
      posts: posts.map do |post|
        case response_type
        when PostResponseHelper::POST_FEED_RESPONSE_TYPE_SIMPLIFIED
          post_response_simplified post
        else
          post_response post
        end
      end,
      has_more: has_more,
      next_offset: specification.offset + posts.length
    }
  end

  def update_parent_reply_count(post)
    return if post.parent_post.nil?

    post.parent_post.reply_count += 1
    post.parent_post.save!
  end

  def create_edit_and_render_errors(message, post, old_content, new_content)
    e = new_edit(message, post, old_content, new_content)
    e.save!
    e
  rescue ActiveRecord::RecordInvalid
    render_validation_error e
    false
  rescue ContentNotChangedError
    render_content_not_changed_error old_content
    false
  rescue CommandFailedError
    render_error(:edit, ['Unable to create the edit for post update. Diff failed.'])
    false
  end

  def new_edit(message, post, old_content, new_content)
    Edit.new(user: current_user,
             post: post,
             version: Edit.where(post_id: post.id).count,
             message: message,
             patch: create_patch(old_content, new_content))
  end

  def render_content_not_changed_error(old_content)
    if old_content.blank?
      render_error(:content, ['can\'t be blank'])
    else
      render_error(:content, ['New content must be different from the old content.'])
    end
  end
end
