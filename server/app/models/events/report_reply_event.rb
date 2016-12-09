# frozen_string_literal: true
class ReportReplyEvent < Event
  validates :reply, presence: true
end
