class Api::V1::Referrals::ReferralsController < ApplicationController
    before_action :authenticate_user!

    def show
        referrals = Referral.get_user_referrals(current_user.id)
        
        render json: {
            data: {
                referrals: referrals
            }
        }, status: :ok
    end

    def create
        sanitized_params = sanitize_create_referral_params
        referral = Referral.create_user_referral(current_user, sanitized_params)

        render json: {
            data: {
                referral: referral
            }
        }, status: :created

    end

    private

    def sanitize_create_referral_params
        params.permit(:email)
    end

end
