# frozen_string_literal: true
class ReportUserEvent < Event
  validates :user, presence: true
end
