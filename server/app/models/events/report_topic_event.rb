# frozen_string_literal: true
class ReportTopicEvent < Event
  validates :topic, presence: true
end
