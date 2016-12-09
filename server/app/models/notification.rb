# frozen_string_literal: true

class Notification < ActiveRecord::Base
  belongs_to :event
  belongs_to :user

  enum status: [:not_viewed, :viewed]
  validates :event, presence: true
  validates :user, presence: true
  validates :count, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
