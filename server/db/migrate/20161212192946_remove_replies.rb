# frozen_string_literal: true
class RemoveReplies < ActiveRecord::Migration[5.0]
  def up
    drop_table :replies
    remove_column :edits, :reply_id, :integer
    remove_column :reports, :reply_id, :integer
  end

  def down
    create_table "replies", force: :cascade do |t|
      t.text    "content"
      t.integer "creator_id"
      t.integer "reply_id"
      t.integer "target_type"
      t.integer "parent_post_id"
      t.integer "root_post_id"
      t.index ["creator_id"], name: "index_replies_on_creator_id"
      t.index ["reply_id"], name: "index_replies_on_reply_id"
    end
    add_column :edits, :reply_id, :integer
    add_column :reports, :reply_id, :integer
  end
end
