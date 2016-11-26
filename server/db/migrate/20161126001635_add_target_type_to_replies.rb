# frozen_string_literal: true
class AddTargetTypeToReplies < ActiveRecord::Migration[5.0]
  def change
    add_column :replies, :target_type, :integer
  end
end
