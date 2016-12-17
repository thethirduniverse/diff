# frozen_string_literal: true
class Post < ActiveRecord::Base
  belongs_to :parent_post, class_name: 'Post', foreign_key: 'parent_post_id'
  belongs_to :root_post, class_name: 'Post', foreign_key: 'root_post_id'
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  has_and_belongs_to_many :categories, join_table: :posts_categories
  has_many :edits
  has_many :posts, class_name: 'Post', foreign_key: 'parent_post_id'
  has_many :derived_posts, class_name: 'Post', foreign_key: 'root_post_id'

  validates :title, presence: true, if: 'parent_post_id.blank?' # allow replies to not have title
  validates :content, presence: true

  validates :parent_post, presence: true, unless: 'parent_post_id.blank?'
  validates :root_post, presence: true, unless: 'root_post_id.blank?'

  def upvoted_by?(user)
    return false if user.nil?
    upvote = Upvote.where(user: user, post: self).take
    !upvote.nil?
  end
end
