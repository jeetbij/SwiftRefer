class ApplicationController < ActionController::API
    include ::RackSessionFix
    rescue_from StandardError, :with => :error_render_method

    def authenticate_user!
        unless user_signed_in?
            Rails.logger.info "[ApplicationController#authenticate_user]: authenticate user failed!"
            render json: { 
                error: 'Your token is expired or revoked.'
            }, status: :unauthorized
        end
    end

    def error_render_method(e)
        Rails.logger.error "[ApplicationController#error_render_method]: Unknown error with error message - #{e.message}"
        render json: {
            message: "Something went wrong!",
            errors: [e.message]
        }, status: :internal_server_error
    end
end
