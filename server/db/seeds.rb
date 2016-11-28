# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require "#{Rails.root}/db/seed_topics.rb"

psw = '12345678'
user = User.create email: 'test@example.com', password: psw, password_confirmation: psw, confirmed_at: Time.now
User.create email: 'gyan4@wisc.edu', password: psw, password_confirmation: psw, confirmed_at: Time.now
User.create email: 'unconfirmed@example.com', password: psw, password_confirmation: psw

%w(Other Religion Philosophy Politics).each do |c|
  Category.create name: c
end

t1 = Topic.create user_id: user.id, title: 'This is a sample question', content: 'This is a sample content'
Reply.create content: 'I agree', creator: user, topic: t1, target_type: :topic
Reply.create content: 'I don\'t agree', creator: user, topic: t1, target_type: :topic

Topic.create user_id: user.id, title: 'A complicated question', content: 'What is this question about?', categories: [Category.find(1)]
