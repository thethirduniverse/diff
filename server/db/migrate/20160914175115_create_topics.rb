class CreateTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :topics do |t|
      t.timestamps
      t.string :title
      t.string :content

      t.integer :user_id
      t.foreign_key :users
    end
  end
end
