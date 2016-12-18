# frozen_string_literal: true

class Invitation < ActiveRecord::Base
  belongs_to :user
  validates :user, presence: true
end
