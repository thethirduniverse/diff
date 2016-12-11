# frozen_string_literal: true
class ChangeDataTypeForTopicContent < ActiveRecord::Migration[5.0]
  def self.up
    change_table :topics do |t|
      t.change :content, :text
    end
  end

  def self.down
    change_table :topics do |t|
      t.change :content, :string
    end
  end
end
