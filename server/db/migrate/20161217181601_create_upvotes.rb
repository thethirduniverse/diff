# frozen_string_literal: true
class CreateUpvotes < ActiveRecord::Migration[5.0]
  def change
    create_table :upvotes do |t|
      t.integer :user_id
      t.integer :post_id
      t.timestamps

      t.index [:post_id, :user_id]
    end
  end
end
