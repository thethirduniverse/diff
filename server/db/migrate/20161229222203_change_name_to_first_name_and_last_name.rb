# frozen_string_literal: true
class ChangeNameToFirstNameAndLastName < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :name, :string
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
  end
end
