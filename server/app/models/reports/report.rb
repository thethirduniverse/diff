# frozen_string_literal: true
class Report < ActiveRecord::Base
  # target of reply
  belongs_to :user
  belongs_to :topic
  belongs_to :reply

  # creator
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  validates :creator, presence: true
end
