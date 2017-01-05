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

  def user_header_response(u)
    {
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      bio: u.bio,
      avatar: u.avatar.url(:thumb)
    }
  end
end
