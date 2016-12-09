# frozen_string_literal: true
class EventPosting
  BroadcastEventJob = Struct.new(:content) do
    def perform
      e = BroadcastEvent.new(content: content)
      e.save!
    end
  end

  def self.post_broadcast(content)
    Delayed::Job.enqueue BroadcastEventJob.new(content)
  end
end
