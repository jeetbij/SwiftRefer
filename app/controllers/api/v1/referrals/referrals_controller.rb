class Api::V1::Referrals::ReferralsController < ApplicationController
    before_action :authenticate_user!

    def show
        referrals = Referral.get_user_referrals(current_user.id)
        
        render json: {
            data: {
                referrals: referrals
            }
        }, status: :ok
    rescue StandardError => e
        Rails.logger.error "[ReferralsController]: Failed to return the referrals data with error message - #{e.message}"
        render json: {
            data: {
                message: "Something went wrong.",
                errors: [e.message]
            }
        }, status: :internal_server_error
    end

    def create
        sanitized_params = sanitize_create_referral_params
        referral = Referral.create_user_referral(current_user, sanitized_params)

        Rails.logger.info "[ReferralsController#create]: Created a referral entry with data - #{sanitized_params.inspect}"

        render json: {
            data: {
                referral: referral
            }
        }, status: :created
    rescue ActiveRecord::RecordNotUnique => e
        Rails.logger.info "[ReferralsController#create]: Skipped referral creation as user already sent the referral."
        render json: {
            data: {
                message: "You have already referred this email id.",
                errors: [e.message]
            }
        }, status: :unprocessable_entity
    rescue StandardError => e
        Rails.logger.error "[ReferralsController#create]: Failed to create the referral entry with data - #{params.inspect} and error message - #{e.message}"
        render json: {
            data: {
                message: "Something went wrong.",
                errors: [e.message]
            }
        }, status: :internal_server_error
    end

    private

    def sanitize_create_referral_params
        params.permit(:email)
    end

end
