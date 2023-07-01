class Api::V1::Users::SessionsController < Devise::SessionsController
    include ::RackSessionFix
    rescue_from StandardError, :with => :error_render_method
    respond_to :json
    
    private
    
    def respond_with(resource, _opts = {})
        if resource
            render json: {
                message: 'Logged in sucessfully.',
                user: resource.as_json(only: [:id, :email])
            }, status: :ok
        else
            render json: {
                message: 'Log in failed.',
                errors: resource.errors.full_messages
            }, status: :unprocessable_entity
        end
    rescue StandardError => e
        render json: {
            message: 'Log in failed.',
            errors: [e.message]
        }, status: :internal_server_error
    end

    def respond_to_on_destroy
        if current_user
            render json: {
                message: "logged out successfully."
            }, status: :ok
        else
            render json: {
                message: "Couldn't find an active session."
            }, status: :ok
        end
    rescue StandardError => e
        render json: {
            message: "Log out failed.",
            errors: [e.message]
        }, status: :internal_server_error
    end

    def error_render_method(e)
        render json: {
            message: "Something went wrong!",
            errors: [e.message]
        }, status: :internal_server_error
    end
end
