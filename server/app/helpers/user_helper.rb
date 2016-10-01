# frozen_string_literal: true
module UserHelper
  def verify_user
    return { user: {}, signedIn: false } unless user_signed_in?

    { user: user_response(current_user), signedIn: true }
  end

  def user_response(user)
    {
      id: user.id,
      email: user.email
    }
  end
end
