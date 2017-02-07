# frozen_string_literal: true
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  force_ssl unless: :allow_http?

  def allow_http?
    !Rails.env.production?
  end
end
