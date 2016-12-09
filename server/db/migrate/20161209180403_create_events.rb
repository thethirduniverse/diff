# frozen_string_literal: true
class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.integer :user_id # user id
      t.integer :topic_id # topic id
      t.integer :reply_id # reply id
      t.integer :edit_id # edit id
      t.string :content
      t.timestamps
    end
  end
end
