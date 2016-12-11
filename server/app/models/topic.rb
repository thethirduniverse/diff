# frozen_string_literal: true
class Topic < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :categories, join_table: :topics_categories
  has_many :replies
  has_many :edits
  has_many :derived_replies, class_name: 'Reply', foreign_key: 'root_topic_id'

  validates :title, presence: true
  validates :content, presence: true
end
