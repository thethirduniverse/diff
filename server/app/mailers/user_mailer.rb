# frozen_string_literal: true
class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    @url = 'http://www.debatable.com'

    mail(to: @user.email, subject: 'Welcome to debatable')
  end
end
