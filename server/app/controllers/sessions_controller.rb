class SessionsController < Devise::SessionsController
  clear_respond_to
  respond_to :json

  def verify
    if user_signed_in?
      render json: { email: current_user.email }
    else
      render json: { error: 'user not signed in' }, status: 401
    end
  end
end
