# frozen_string_literal: true
class RegistrationsController < Devise::RegistrationsController
  require 'securerandom'
  # stop static pages from loading
  # http://blog.andrewray.me/how-to-set-up-devise-ajax-authentication-with-rails-4-0/
  clear_respond_to
  respond_to :json

  before_action :authenticate_user!, only: [:generate_invitation_code]

  def create
    code = get_code(params[:invitation_code])

    unless code
      render_invalid_code
      return
    end

    super do
      resource.update(invited_by: code.user) if code.update(used: true)
    end
  end

  def generate_invitation_code
    invites = Invitation.where(user: current_user, used: false)
    unless invites.count < 10
      render_too_many_codes(invites)
      return
    end

    i = Invitation.new(user: current_user, code: unique_code, used: false)
    if i.save
      render_code(i)
    else
      render_cannot_generate_code
    end
  end

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

  private

  def render_code(i)
    render json: {
      code: i.code
    }, status: 200
  end

  def render_too_many_codes(invites)
    render json: {
      error: 'Each user can only have 10 invitation codes that has not yet been confirmed.',
      codes: invites.map(&:code)
    }, status: 200
  end

  def render_invalid_code
    render json: {
      errors: {
        invitation_code: 'The code you provided is invalid. Please use another code.'
      }
    }, status: 400
  end

  def render_cannot_generate_code
    render json: {
      error: 'Unable to generate the invitation code. Some error occurred.'
    }, status: 500
  end

  def get_code(code)
    return nil if code.nil?
    i = Invitation.find_by_code(code)
    return nil if i.nil? || i.used?
    i
  end

  # potentially loop forever, but let's be realistic
  def unique_code
    code = random_code
    code = random_code until Invitation.find_by_code(code).nil?
    code
  end

  def random_code
    SecureRandom.hex[0...12]
  end
end
