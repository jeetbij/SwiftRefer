# spec/models/user_spec.rb

require 'rails_helper'

RSpec.describe Referral, type: :model do
  describe 'validations' do
		before(:all) do
			@user = User.new(email: 'jeet@gmail.com', password: 'password')
	  end

		it 'is valid with valid attributes' do
			referral = Referral.new({ user: @user, email: "some@email.com" })
			expect(referral).to be_valid
		end

		it 'is not valid without a password' do
			referral = Referral.new({ user: @user })
			expect(referral).not_to be_valid
		end

		it 'is not valid without a email' do
			referral = Referral.new({ email: "some@email.com" })
			expect(referral).not_to be_valid
		end

		it 'send_referral_mail should be called after new referral created' do
			referral = Referral.new({ user: @user, email: "some@email.com" })
			allow_any_instance_of(Referral).to receive(:send_referral_mail).and_return(true)
			expect(referral).to receive(:send_referral_mail)
			referral.save
		end

		it 'expects as_json to not return user_id' do
			referral = Referral.new({ user: @user, email: "some@email.com" })
			as_json = referral.as_json()
			expect(as_json).not_to have_key(:user_id)
		end

		it "expects get_user_referrals to return current user's referrals" do
			referrals = Referral.get_user_referrals(@user.id)
			actual_referrals = Referral.where(user_id: @user.id)
			expect(referrals.length).to eq(actual_referrals.length)
		end
  end

end
