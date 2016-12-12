# frozen_string_literal: true
class RemoveTopics < ActiveRecord::Migration[5.0]
  def up
    drop_table :topics

    remove_column :edits, :topic_id, :integer
    remove_column :replies, :topic_id, :integer
    remove_column :replies, :root_topic_id, :integer
    remove_column :reports, :topic_id, :integer
  end

  def down
    create_table "topics", force: :cascade do |t|
      t.datetime "created_at",             null: false
      t.datetime "updated_at",             null: false
      t.string   "title"
      t.text     "content"
      t.integer  "user_id"
      t.integer  "view", default: 0, null: false
    end

    add_column :edits, :topic_id, :integer
    add_column :reports, :topic_id, :integer

    add_column :replies, :topic_id, :integer
    add_column :replies, :root_topic_id, :integer
    add_index :replies, :topic_id
    add_index :replies, :root_topic_id
  end
end
