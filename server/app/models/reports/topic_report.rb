# frozen_string_literal: true
class TopicReport < Report
  validates :topic, presence: true
end
