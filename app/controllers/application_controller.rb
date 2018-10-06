class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # 未ログイン時はログインページに
  before_action :authenticate_user!
  # 追加のパラメーターを許可
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end