# frozen_string_literal: true
class TopicEdit < Edit
  validates :topic, presence: true
end
