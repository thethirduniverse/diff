# frozen_string_literal: true
module NotificationHelper
  def notifications(user)
    ns = Notification.where(user: user).order(modified_at: :desc)
    {
      notifications: ns.map do |n|
        notification_response(n)
      end
    }
  end

  def notification_response(n)
    {
      id: n.id,
      event: event_response(n.event),
      count: n.count,
      status: n.status
    }
  end

  def event_response(e)
    {
      type: e.type,
      topic_id: e.topic_id,
      reply_id: e.reply_id,
      user_id: e.user_id,
      content: e.content
    }
  end
end
