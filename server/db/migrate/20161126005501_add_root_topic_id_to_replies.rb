# frozen_string_literal: true
class AddRootTopicIdToReplies < ActiveRecord::Migration[5.0]
  def change
    add_reference :replies, :root_topic, index: true, foreign_key: { to_table: :topics }
  end
end
