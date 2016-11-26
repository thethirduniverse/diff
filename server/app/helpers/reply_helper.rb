# frozen_string_literal: true
module ReplyHelper
  def reply_response(r)
    {
      'id': r.id,
      'content': r.content,
      'topic_id': r.topic_id,
      'reply_id': r.reply_id,
      'root_topic_id': r.root_topic_id
    }
  end
end
