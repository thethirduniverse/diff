# frozen_string_literal: true
class RegistrationsController < Devise::RegistrationsController
  # stop static pages from loading
  # http://blog.andrewray.me/how-to-set-up-devise-ajax-authentication-with-rails-4-0/
  clear_respond_to
  respond_to :json
end
