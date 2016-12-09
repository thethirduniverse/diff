# frozen_string_literal: true
class BroadcastEvent < Event
  validates :content, presence: true
end
