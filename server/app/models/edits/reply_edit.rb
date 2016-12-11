# frozen_string_literal: true
class ReplyEdit < Edit
  validates :reply, presence: true
end
