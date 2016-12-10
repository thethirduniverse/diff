# frozen_string_literal: true
class AddReportIdToEvents < ActiveRecord::Migration[5.0]
  def change
    add_reference :events, :report, foreign_key: true
    remove_column :events, :user_id, :integer
    remove_column :events, :topic_id, :integer
    remove_column :events, :reply_id, :integer
    remove_column :events, :edit_id, :integer
  end
end
