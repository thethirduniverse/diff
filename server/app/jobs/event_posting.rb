# frozen_string_literal: true
class EventPosting
  BroadcastEventJob = Struct.new(:content) do
    def perform
      e = BroadcastEvent.new(content: content)
      e.save!
      User.all.each do |u|
        n = Notification.new(event: e, user: u, count: 1, status: :not_viewed, modified_at: Time.now)
        unless n.save
          Rails.logger.warn "Creating notification failed. Notification: #{n.inspect}. User: #{u.inspect}. Event: #{e.inspect}."
        end
      end
    end
  end

  def self.post_broadcast(content)
    Delayed::Job.enqueue BroadcastEventJob.new(content)
  end
end
