# spec/models/user_spec.rb

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      user = User.new(email: 'jeet@gamil.com', password: 'password')
      expect(user).to be_valid
    end

    it 'is not valid without a password' do
      user = User.new(email: 'jeet@gmail.com')
      expect(user).not_to be_valid
    end

    it 'is not valid without a email' do
      user = User.new(password: 'password')
      expect(user).not_to be_valid
    end
  end
end
