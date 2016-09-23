# frozen_string_literal: true
class AddViewToTopics < ActiveRecord::Migration[5.0]
  def change
    change_table :topics do |t|
      t.integer :view, default: 0, null: false
    end
  end
end
