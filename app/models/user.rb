class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
    :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :referrals, dependent: :destroy

  validates :password, :presence => true
  validates :email, :presence => true

  def jwt_payload
    super.merge('email' => email)
  end
end
