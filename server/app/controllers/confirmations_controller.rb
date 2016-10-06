# frozen_string_literal: true
class ConfirmationsController < Devise::ConfirmationsController
  private

  def after_confirmation_path_for(resource_name, _resource)
    return sign_in_path if resource_name == :user
    '/'
  end
end
