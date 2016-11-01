# frozen_string_literal: true
class AddAvatarsToUsers < ActiveRecord::Migration[5.0]
  def up
    add_attachment :users, :avatar
  end

  def down
    remove_attachment :users, :avatar
  end
end
