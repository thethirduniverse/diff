# frozen_string_literal: true
class AddLastEditIdToPosts < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :last_edit_id, :integer
  end
end
