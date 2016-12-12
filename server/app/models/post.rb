# frozen_string_literal: true
class Post < ActiveRecord::Base
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  has_and_belongs_to_many :categories, join_table: :posts_categories
  has_many :edits
  has_many :posts, class_name: 'Post', foreign_key: 'parent_post_id'
  has_many :derived_posts, class_name: 'Post', foreign_key: 'root_post_id'

  validates :title, presence: true
  validates :content, presence: true
end
