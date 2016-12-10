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
      report: report_response(e.report),
      content: e.content
    }
  end

  def report_response(r)
    return {} if r.nil?

    {
      type: r.type,
      user_id: r.user_id,
      topic_id: r.topic_id,
      reply_id: r.reply_id,
      creator_id: r.creator_id,
      content: r.content
    }
  end
end
