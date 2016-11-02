# frozen_string_literal: true
class UsersController < ApplicationController
  before_action :authenticate_user!

  def update_avatar
    current_user.avatar = params[:user][:avatar]
    if current_user.save
      render json: {}, status: 200
    else
      render json: {
        errors: current_user.errors.messages
      }, status: 400
    end
  end
end
