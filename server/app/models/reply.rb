# frozen_string_literal: true

class Reply < ActiveRecord::Base
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  belongs_to :topic, class_name: 'Topic', foreign_key: 'topic_id'

  belongs_to :parent_reply, class_name: 'Reply', foreign_key: 'reply_id'
  has_many :replies, class_name: 'Reply', foreign_key: 'reply_id'

  validates :creator, presence: true
  validates :content, presence: true

  enum target_type: [:topic, :reply], _prefix: :target
  validates :topic, presence: true
  validates :parent_reply, presence: true, if: 'target_reply?'
end
