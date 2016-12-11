# frozen_string_literal: true
class Edit < ActiveRecord::Base
  belongs_to :user
  belongs_to :topic
  belongs_to :reply

  validates :user, presence: true
  validates :version, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :message, presence: true
  validates :patch, presence: true
end
