# frozen_string_literal: true
class RepliesController < ApplicationController
  include ReplyHelper

  clear_respond_to
  respond_to :json

  before_action :authenticate_user!

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

  private

  def reply_params
    params.require(:reply).permit(:content, :topic_id)
  end

end
