# frozen_string_literal: true
class CreateReports < ActiveRecord::Migration[5.0]
  def change
    create_table :reports do |t|
      t.integer :user_id
      t.integer :topic_id
      t.integer :reply_id

      t.integer :creator_id
      t.string :content

      t.string :type
      t.timestamps
    end
  end
end
