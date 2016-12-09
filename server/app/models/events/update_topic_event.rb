# frozen_string_literal: true
class UpdateTopicEvent < Event
  validates :topic, presence: true
end
