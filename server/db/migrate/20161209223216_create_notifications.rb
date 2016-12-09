# frozen_string_literal: true
class CreateNotifications < ActiveRecord::Migration[5.0]
  def change
    create_table :notifications do |t|
      t.integer :event_id
      t.integer :user_id
      t.integer :count
      t.integer :status
      t.datetime :modified_at

      t.index :event_id
      t.index :user_id
      t.index :status
      t.index :modified_at
    end
  end
end
