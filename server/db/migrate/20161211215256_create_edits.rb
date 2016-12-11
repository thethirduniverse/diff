# frozen_string_literal: true
class CreateEdits < ActiveRecord::Migration[5.0]
  def change
    create_table :edits do |t|
      t.string :type
      t.integer :topic_id
      t.integer :reply_id

      t.integer :user_id
      t.integer :version
      t.text :message
      t.text :patch
      t.timestamps
    end
  end
end
