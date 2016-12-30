# frozen_string_literal: true
class MainController < ApplicationController
  include UserHelper
  include PostHelper
  include CategoryHelper
  include FeedSpecification

  def index
    @bootstrap = {
      user_status: verify_user,
      post_feed: posts_feed(NewestFeedSpecification.new(10)),
      categories: default_categories
    }.to_json.html_safe
  end
end
