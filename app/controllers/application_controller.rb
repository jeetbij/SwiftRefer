class ApplicationController < ActionController::API
    include ::RackSessionFix
    rescue_from StandardError, :with => :error_render_method

    def error_render_method(e)
        render json: {
            message: "Something went wrong!",
            errors: [e.message]
        }, status: :internal_server_error
    end
end
