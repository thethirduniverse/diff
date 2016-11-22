# frozen_string_literal: true
class AddReplyIdToReplies < ActiveRecord::Migration[5.0]
  def up
    add_reference :replies, :reply, index: true, foreign_key: true
  end
end
