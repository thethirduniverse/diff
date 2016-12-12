# frozen_string_literal: true
class Category < ActiveRecord::Base
  has_and_belongs_to_many :posts, join_table: :posts_categories
end
