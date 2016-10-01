# frozen_string_literal: true
class MainController < ApplicationController
  include UserHelper
  include TopicHelper
  include CategoryHelper

  def index
    @bootstrap = {
      user_status: verify_user,
      topic_feed: topics_feed,
      categories: default_categories
    }.to_json.html_safe
  end
end
