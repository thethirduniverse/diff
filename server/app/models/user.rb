# frozen_string_literal: true
class User < ActiveRecord::Base
  has_many :topics

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  has_attached_file :avatar, styles: { large: '500x500>', medium: '300x300>', thumb: '40x40>' }, default_url: '/assets/:style/default_avatar.jpg'
  validates_attachment_content_type :avatar, content_type: %r{\Aimage\/.*\z}

  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end
end
