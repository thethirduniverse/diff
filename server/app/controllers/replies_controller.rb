# frozen_string_literal: true
class RepliesController < ApplicationController
  include ReplyHelper
  include DiffHelper

  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:replies]

  def create
    reply = Reply.new(reply_params)
    reply.creator = current_user

    unless reply.save
      render_create_validation_error reply
      return
    end

    unless create_initial_edit reply
      render_create_edit_error
      return
    end

    render_create_success reply
  end

  def replies
    reply_id = params['reply']['id']

    replies = Reply.find(reply_id).replies
    render json: {
      replies: replies.map do |r|
        reply_response r
      end
    }, status: 200
  end

  private

  def render_create_success(reply)
    render json: {
      reply: reply_response(reply)
    }, status: 200
  end

  def render_create_edit_error
    render json: {
      errors: {
        edit: 'Unable to create initial edit for reply.'
      }
    }, status: 500
  end

  def render_create_validation_error(reply)
    render json: {
      errors: reply.errors.messages
    }, status: 400
  end

  def create_initial_edit(reply)
    e = ReplyEdit.new(user: current_user,
                      reply: reply,
                      version: 0,
                      message: 'Initial Version.',
                      patch: create_patch('', reply.content))
    e.save
  end

  def reply_params
    ps = params.require(:reply).permit(:content, :topic_id, :reply_id)

    # the topic of a reply to another reply is that reply's topic
    if ps[:reply_id]
      parent = Reply.find_by_id(ps[:reply_id])
      ps[:root_topic_id] = effective_topic_id(parent)
      ps[:target_type] = :reply
    else
      ps[:reply_id] = nil
      ps[:target_type] = :topic
    end

    ps
  end

  def effective_topic_id(reply)
    return nil unless reply

    if reply.target_topic?
      reply.topic.id
    elsif reply.target_reply?
      reply.root_topic.id
    end
  end
end
