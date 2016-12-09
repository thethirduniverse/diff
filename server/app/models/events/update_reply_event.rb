# frozen_string_literal: true
class UpdateReplyEvent < Event
  validates :reply, presence: true
end
