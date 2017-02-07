# frozen_string_literal: true
class User < ActiveRecord::Base
  belongs_to :invited_by, class_name: 'User', foreign_key: 'invited_by'
  has_many :posts, foreign_key: 'creator_id'

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  # rubocop:disable LineLength
  has_attached_file :avatar,
                    styles: { large: '500x500>', medium: '300x300>', thumb: '40x40>' },
                    default_url: '/assets/default_avatar/:style/default_avatar.jpg',
                    url: '/system/users/avatars/:id_partition/:style/:hash.:extension',
                    hash_secret: '2c9d02240808810c66136227f822b4685347c7b25698a04f9bdbd951bfc0fc21852f11cbb8e5cf138e2c70896629bb0126b20057a29a52dc77ba1d6a072c8cd7'
  # rubocop:enable LineLength
  validates_attachment_content_type :avatar, content_type: %r{\Aimage\/.*\z}

  def send_devise_notification(notification, *args)
    devise_mailer.send(notification, self, *args).deliver_later
  end
end
