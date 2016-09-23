# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

psw = '12345678'
user = User.create email: 'test@example.com', password: psw, password_confirmation: psw

%w(Other Religion Philosophy Politics).each do |c|
  Category.create name: c
end

Topic.create user_id: user.id, title: 'Should eating apples be banned', content: '15 reasons not to ban eating apples...'
Topic.create user_id: user.id, title: 'A complicated question', content: 'What is this question about?', categories: [Category.find(1)]
