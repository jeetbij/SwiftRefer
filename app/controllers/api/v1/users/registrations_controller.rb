class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
    include ::RackSessionFix
    rescue_from StandardError, :with => :error_render_method
    respond_to :json

    private

    def respond_with(resource, _opts = {})
        if resource.persisted?
            render json: {
                message: 'Signed up sucessfully.',
                user: resource.as_json(only: [:id, :email])
            }
        else
            render json: {
                message: "Sign up failed.",
                errors: resource.errors.full_messages
            }, status: :unprocessable_entity
        end
    rescue StandardError => e
        render json: {
            message: "Something went wrong!",
            errors: [e.message]
        }, status: :internal_server_error
    end

    def error_render_method(e)
        raise e
    rescue ActiveRecord::RecordNotUnique => e
        render json: {
            message: "Failed to sign up.",
            errors: ["User is already registered with this email id."]
        }, status: :unprocessable_entity
    rescue Error => e
        render json: {
            message: "Something went wrong!",
            errors: [e.message]
        }, status: :internal_server_error
    end
end
