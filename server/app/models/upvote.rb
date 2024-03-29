# frozen_string_literal: true

class Upvote < ActiveRecord::Base
  belongs_to :post
  belongs_to :user

  validates :post, presence: true
  validates :user, presence: true
end
