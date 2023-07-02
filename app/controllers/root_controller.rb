class RootController < ActionController::Base
    def index
        Rails.logger.info "[RootController#index]: Rendering the roor template."
        render 'application'
    end
end
