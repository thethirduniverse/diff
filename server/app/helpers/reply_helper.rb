# frozen_string_literal: true
module ReplyHelper
  def reply_response(r)
    {
      'id': r.id,
      'content': r.content
    }
  end
end
