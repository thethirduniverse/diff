# frozen_string_literal: true
class MainController < ApplicationController
  include UserHelper
  include TopicHelper

  def index
    @bootstrap = {
      user_status: verify_user,
      topic_feed: topics_feed
    }.to_json.html_safe
  end
end
