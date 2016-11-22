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
    reply_id = params['reply']['reply_id']

    replies = Reply.find(reply_id).replies
    render json: {
      replies: replies.map do |r|
        reply_response r
      end
    }, status: 200
  end

  private

  def reply_params
    params.require(:reply).permit(:content, :topic_id, :reply_id)
  end
end
