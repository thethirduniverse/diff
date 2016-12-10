# frozen_string_literal: true
class UserReport < Report
  validates :user, presence: true
end
