# frozen_string_literal: true
class UsersController < ApplicationController
  include RenderHelper

  before_action :authenticate_user!

  def update
    if current_user.id.to_s != params[:id]
      render_unauthorized
      return
    end

    if current_user.update(update_params)
      render_empty_success
    else
      render_model_errors current_user
    end
  end

  private

  def update_params
    params.require(:user).permit(:first_name, :last_name, :bio, :avatar)
  end
end
