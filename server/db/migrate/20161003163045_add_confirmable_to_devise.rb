# frozen_string_literal: true
class AddConfirmableToDevise < ActiveRecord::Migration[5.0]
  def up
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datatime
    add_column :users, :confirmation_sent_at, :datetime

    add_index :users, :confirmation_token, unique: true

    User.all.update_all confirmed_at: Time.now
  end

  def down
    remove_columns :users, :confirmation_token, :confirmed_at, :confirmation_sent_at
  end
end
