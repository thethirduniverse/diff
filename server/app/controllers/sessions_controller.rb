# frozen_string_literal: true
class SessionsController < Devise::SessionsController
  clear_respond_to
  respond_to :json

  # http://stackoverflow.com/questions/13836139/rails-how-to-override-devise-sessionscontroller-to-perform-specific-tasks-when
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    render json: { user: user_response(current_user), newCSRFToken: form_authenticity_token }
  end

  # http://stackoverflow.com/questions/11845500/rails-devise-authentication-csrf-issue
  def destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    render json: { newCSRFToken: form_authenticity_token }
  end

  def verify
    if user_signed_in?
      render json: { user: user_response(current_user), signedIn: true }
    else
      render json: { user: {}, signedIn: false }
    end
  end

  private

  def user_response(user)
    {
      email: user.email
    }
  end
end
