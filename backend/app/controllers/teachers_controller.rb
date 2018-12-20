class TeachersController < ApplicationController

    def create
      teacher = Teacher.create(user_params)
    end

    def show
      @teacher = Teacher.find_by(name: params[:id])
      render json: @teacher
#    @products = @category.products.order(created_at: :desc)
    end

  private
    def user_params
      params.require(:teacher).permit(:name)
    end
end
