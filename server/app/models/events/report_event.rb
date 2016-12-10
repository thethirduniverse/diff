# frozen_string_literal: true
class ReportEvent < Event
  validates :report, presence: true
end
