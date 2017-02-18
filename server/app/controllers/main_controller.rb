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
  end

  @bundle_js_path = load_bundle_js_path

  def index
    @bundle_js_path = self.class.load_bundle_js_path unless Rails.env.production?

    @bootstrap = {
      user_status: verify_user,
      post_feed: posts_feed(NewestFeedSpecification.new(10)),
      categories: default_categories
    }.to_json.html_safe
  end
end
