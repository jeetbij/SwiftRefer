class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
    include ::RackSessionFix
    rescue_from StandardError, :with => :error_render_method
    respond_to :json

    private

    def respond_with(resource, _opts = {})
        if resource.persisted?
            Rails.logger.info "[RegistrationsController]: User sign up success."
            render json: {
                message: 'Signed up sucessfully.',
                user: resource.as_json(only: [:id, :email])
            }
        else
            Rails.logger.error "[RegistrationsController]: User sign up failed with errors - #{resource.errors.full_messages}."
            render json: {
                message: "Sign up failed.",
                errors: resource.errors.full_messages
            }, status: :unprocessable_entity
        end
    rescue StandardError => e
        Rails.logger.error "[RegistrationsController]: User sign up failed with error message - #{e.message}."
        render json: {
            message: "Something went wrong!",
            errors: [e.message]
        }, status: :internal_server_error
    end

    def error_render_method(e)
        Rails.logger.error "[RegistrationsController#error_render_method]: Error exception message - #{e.message}."
        raise e
    rescue ActiveRecord::RecordNotUnique => e
        Rails.logger.info "[RegistrationsController#error_render_method]: User is already registered with the email id."
        render json: {
            message: "Failed to sign up.",
            errors: ["User is already registered with this email id."]
        }, status: :unprocessable_entity
    rescue Error => e
        Rails.logger.info "[RegistrationsController#error_render_method]: Unknown error occurred error message - #{e.message}"
        render json: {
            message: "Something went wrong!",
            errors: [e.message]
        }, status: :internal_server_error
    end
end
