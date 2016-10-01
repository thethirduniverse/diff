# frozen_string_literal: true
class MainController < ApplicationController
  include UserHelper

  def index
    @bootstrap = {
      user_status: verify_user
    }.to_json.html_safe
  end
end
