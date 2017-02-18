# frozen_string_literal: true
def index_aliases
  %w(
    /posts/*ignored
    /posts
    /profiles/*ignores
    /invitation
    /about
  ).each do |url|
    get url => 'main#index'
  end

  scope :account do
    get '/sign-in' => 'main#index', as: 'sign_in'
    get '/sign-up' => 'main#index', as: 'sign_up'
    get '/reset-password/password' => 'main#index', as: 'custom_reset_password'
  end
end

Rails.application.routes.draw do
  scope :api do
    devise_for :users, controllers: { sessions: 'sessions', registrations: 'registrations', confirmations: 'confirmations', passwords: 'passwords' }

    resources :posts, only: [:index, :show, :create, :update] do
      resource :upvotes, only: [:create, :destroy]
      resource :edits, only: [:show]
      get 'replies' => 'posts#replies'
    end

    devise_scope :user do
      post '/invitation-code' => 'registrations#generate_invitation_code'
      post '/request-reset-password' => 'registrations#request_reset_password'
      post '/users/fetch' => 'sessions#fetch', as: 'fetch_session'
    end

    get '/profiles/load_posts' => 'profiles#load_posts'
    get '/profiles/:id' => 'profiles#show'
    put '/users/:id' => 'users#update'

    scope :report do
      post '/user' => 'reports#report_user'
      post '/post' => 'reports#report_post'
      post '/edit' => 'reports#report_edit'
    end
  end

  index_aliases
  root 'main#index'
end
