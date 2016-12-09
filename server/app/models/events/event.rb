# frozen_string_literal: true
class Event < ActiveRecord::Base
  belongs_to :user
  belongs_to :topic
  belongs_to :reply
end
