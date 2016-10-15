# frozen_string_literal: true
class CreateReplies < ActiveRecord::Migration[5.0]
  def change
    create_table :replies do |t|
      t.string :title
      t.text :content
    end
    add_reference :replies, :creator, foreign_key: { to_table: :users }
    add_reference :replies, :topic, foreign_key: { to_table: :topics }
  end
end
