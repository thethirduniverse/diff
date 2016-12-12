# frozen_string_literal: true
class PostReport < Report
  validates :post, presence: true
end
