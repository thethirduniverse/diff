# frozen_string_literal: true
class AddUpvoteCountToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :upvote_count, :integer, default: 0, null: false
  end
end
