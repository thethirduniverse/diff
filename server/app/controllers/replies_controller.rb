# frozen_string_literal: true
class RepliesController < ApplicationController
  include ReplyHelper

  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, except: [:replies]

  def create
    reply = Reply.new(reply_params)
    reply.creator = current_user
    if reply.valid?
      reply.save!
      render json: {
        reply: reply_response(reply)
      }, status: 200
    else
      render json: {
        errors: reply.errors.messages
      }, status: 400
    end
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

  def reply_params
    ps = params.require(:reply).permit(:content, :topic_id, :reply_id)

    # the topic of a reply to another reply is that reply's topic
    if ps[:reply_id]
      parent = Reply.find_by_id(ps[:reply_id])
      ps[:root_topic_id] = parent ? parent.topic.id : nil
      ps[:target_type] = :reply
    else
      ps[:reply_id] = nil
      ps[:target_type] = :topic
    end

    ps
  end
end
