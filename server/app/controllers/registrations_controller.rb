# frozen_string_literal: true
class RegistrationsController < Devise::RegistrationsController
  # stop static pages from loading
  # http://blog.andrewray.me/how-to-set-up-devise-ajax-authentication-with-rails-4-0/
  clear_respond_to
  respond_to :json

  # We don't have a good way to subclass and calling super without super calls respond_with
  # Therefore we have to deal with the fact that devise renders the new user directly
end
