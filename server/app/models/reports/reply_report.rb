# frozen_string_literal: true
class ReplyReport < Report
  validates :reply, presence: true
end
