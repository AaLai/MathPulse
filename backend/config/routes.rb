Rails.application.routes.draw do

  resources :teachers, only: [:create]
  resources :students, only: [:create]
  resources :tests, only: [:create]
  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
