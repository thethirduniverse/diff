# frozen_string_literal: true
class MainController < ApplicationController
  include UserHelper
  include PostHelper
  include CategoryHelper
  include FeedSpecification

  class << self
    def load_bundle_js_path
      File.basename(Dir.glob(Rails.root.join('public', 'bundle-*.js'))[0])
    end
    attr_accessor :bundle_js_path
  end

  @bundle_js_path = load_bundle_js_path

  def index
    @bundle_js_path =
      if Rails.env.production?
        self.class.bundle_js_path
      else
        self.class.load_bundle_js_path
      end

    @bootstrap = {
      user_status: verify_user,
      post_feed: posts_feed(NewestFeedSpecification.new(10)),
      categories: default_categories
    }.to_json.html_safe
  end
end
