# frozen_string_literal: true
class RegistrationsController < Devise::RegistrationsController
  # stop static pages from loading
  # http://blog.andrewray.me/how-to-set-up-devise-ajax-authentication-with-rails-4-0/
  clear_respond_to
  respond_to :json

  # We don't have a good way to subclass and calling super without super calls respond_with
  # Therefore we have to deal with the fact that devise renders the new user directly

  def request_reset_password
    email = params[:email]

    user = User.find_by_email(email)
    if user
      user.send_reset_password_instructions
      render json: {}, status: 200
    else
      render json: {
        errors: {
          email: 'The email does not have an associated account.'
        }
      }, status: 400
    end
  end
end
