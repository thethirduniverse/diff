# frozen_string_literal: true
class AddTypeTpEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :type, :string
  end
end
