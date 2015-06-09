Rails.application.routes.draw do
  get '/' => 'comics#index'
  resources :comics do
  end
end
