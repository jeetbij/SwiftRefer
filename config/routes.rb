Rails.application.routes.draw do
  devise_for :users, :controllers => { 
    registrations: 'api/v1/users/registrations',
    sessions: 'api/v1/users/sessions' 
  }

  namespace :api do
    namespace :v1 do
      namespace :referrals do
        get '/', to: 'referrals#show'
        post '/', to: 'referrals#create'
      end
    end
  end

  # devise_for :users, :controllers => { 
  #       registrations: 'registrations',
  #       sessions: 'sessions' 
  #     }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
