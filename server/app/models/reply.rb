# frozen_string_literal: true
class Reply < ActiveRecord::Base
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  belongs_to :topic, class_name: 'Topic', foreign_key: 'topic_id'
end
