# frozen_string_literal: true
class CreateTopicsCategoriesJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :topics_categories, id: false do |t|
      t.integer :topic_id
      t.integer :category_id
    end

    add_index :topics_categories, :topic_id
    add_index :topics_categories, :category_id
  end
end
