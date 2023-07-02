class Api::V1::Users::SessionsController < Devise::SessionsController
    include ::RackSessionFix
    rescue_from StandardError, :with => :error_render_method
    respond_to :json
    
    private
    
    def respond_with(resource, _opts = {})
        if resource
            Rails.logger.info "[SessionsController]: User sign in success."
            render json: {
                message: 'Logged in sucessfully.',
                user: resource.as_json(only: [:id, :email])
            }, status: :ok
        else
            Rails.logger.error "[SessionsController]: User log in failed with error messages - #{resource.errors.full_messages}."
            render json: {
                message: 'Log in failed.',
                errors: resource.errors.full_messages
            }, status: :unprocessable_entity
        end
    rescue StandardError => e
        Rails.logger.error "[SessionsController]: User log in failed with error message - #{e.message}."
        render json: {
            message: 'Log in failed.',
            errors: [e.message]
        }, status: :internal_server_error
    end

    def respond_to_on_destroy
        if current_user
            Rails.logger.info "[SessionsController#respond_to_on_destroy]: User log out success."
            render json: {
                message: "logged out successfully."
            }, status: :ok
        else
            Rails.logger.info "[SessionsController#respond_to_on_destroy]: Couldn't find an active session."
            render json: {
                message: "Couldn't find an active session."
            }, status: :ok
        end
    rescue StandardError => e
        Rails.logger.error "[SessionsController#respond_to_on_destroy]: Failed to log out the user with error message - #{e.message}."
        render json: {
            message: "Log out failed.",
            errors: [e.message]
        }, status: :internal_server_error
    end

    def error_render_method(e)
        Rails.logger.error "[SessionsController#error_render_method]: Unknown error with error message - #{e.message}."
        render json: {
            message: "Something went wrong!",
            errors: [e.message]
        }, status: :internal_server_error
    end
end
