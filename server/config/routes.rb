# frozen_string_literal: true
Rails.application.routes.draw do
  scope :api do
    devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations', confirmations: 'confirmations', passwords: 'passwords' }

    resources :posts, only: [:index, :show, :create, :update] do
      resource :upvotes, only: [:create, :destroy]
    end
    get 'replies' => 'posts#replies'

    devise_scope :user do
      post '/invitation-code' => 'registrations#generate_invitation_code'
      post '/request-reset-password' => 'registrations#request_reset_password'
      post '/users/fetch' => 'sessions#fetch', as: 'fetch_session'
    end

    get '/profiles/load_posts' => 'profiles#load_posts'
    get '/profiles/:id' => 'profiles#show'
    post '/update-avatar' => 'users#update_avatar'

    scope :report do
      post '/user' => 'reports#report_user'
      post '/post' => 'reports#report_post'
    end
  end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  get '/posts/*ignored' => 'main#index'
  get '/posts' => 'main#index'
  get '/profiles/*ignored' => 'main#index'
  get '/invitation' => 'main#index'

  scope :account do
    get '/sign-in' => 'main#index', as: 'sign_in'
    get '/sign-up' => 'main#index', as: 'sign_up'
    get '/reset-password/password' => 'main#index', as: 'custom_reset_password'
  end

  # You can have the root of your site routed with "root"
  root 'main#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
