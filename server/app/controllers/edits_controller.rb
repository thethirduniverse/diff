# frozen_string_literal: true
class EditsController < ApplicationController
  clear_respond_to
  respond_to :json

  def show
    edits = Edit.where(post_id: params[:post_id]).order(version: :desc).map do |e|
      edit_response e
    end

    render json: {
      edits: edits
    }, status: 200
  end

  private

  def edit_response(e)
    {
      user: edit_user_response(e.user),
      version: e.version,
      message: e.message,
      patch: e.patch
    }
  end

  def edit_user_response(u)
    {
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name
    }
  end
end
