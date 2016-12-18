# frozen_string_literal: true
class ImplementInvitation < ActiveRecord::Migration[5.0]
  def change
    create_table :invitations do |t|
      t.string :code, index: true
      t.integer :user_id, index: true
      t.boolean :used
      t.timestamps
    end

    add_column :users, :invited_by, :integer
  end
end
