# frozen_string_literal: true
class RenameTopicsCategoriesToPostsCategories < ActiveRecord::Migration[5.0]
  def change
    rename_table :topics_categories, :posts_categories
  end
end
