# frozen_string_literal: true
class AddEditIdToReports < ActiveRecord::Migration[5.0]
  def change
    add_column :reports, :edit_id, :integer
  end
end
