# frozen_string_literal: true
class RemoveTypeFromEdits < ActiveRecord::Migration[5.0]
  def change
    remove_column :edits, :type, :string
  end
end
