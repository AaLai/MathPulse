class TeachersController < ApplicationController

    def create
    teacher = Teacher.create(user_params)
    end

  private
    def user_params
      params.require(:teacher).permit(:name)
    end
end
