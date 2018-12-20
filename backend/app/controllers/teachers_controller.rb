class TeachersController < ApplicationController

    def create
      teacher = Teacher.create(user_params)
    end

    def show
      name = params[:id]
      teacher = Teacher.find_by(name: params[:id])
      render json: teacher
    end

  private
    def user_params
      params.require(:teacher).permit(:name)
    end
end
