# frozen_string_literal: true
class CreatePosts < ActiveRecord::Migration[5.0]
  # rubocop:disable MethodLength, Metrics/AbcSize
  def change
    create_table :posts do |t|
      t.text :title
      t.text :content

      t.integer :view, default: 0
      t.integer :root_post_id
      t.integer :parent_post_id
      t.integer :creator_id
      t.timestamps

      t.index :root_post_id
      t.index :parent_post_id
      t.index :creator_id
    end

    add_column :edits, :post_id, :integer
    add_column :reports, :post_id, :integer

    add_column :replies, :parent_post_id, :integer # temporary, for transition
    add_column :replies, :root_post_id, :integer

    # change name of join table later
    add_column :topics_categories, :post_id, :integer
    add_index :topics_categories, :post_id
    remove_column :topics_categories, :topic_id, :integer
  end
end
