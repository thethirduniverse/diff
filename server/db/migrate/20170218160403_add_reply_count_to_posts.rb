# frozen_string_literal: true
class AddReplyCountToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :reply_count, :integer, default: 0, null: false
  end
end
