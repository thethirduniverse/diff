# frozen_string_literal: true
class Category < ActiveRecord::Base
  has_and_belongs_to_many :topics, join_table: :topics_categories
end
