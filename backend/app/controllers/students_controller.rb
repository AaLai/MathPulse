class StudentsController < ApplicationController

    def create
      student = Student.create(user_params)
    end

  private
    def user_params
      params.require(:student).permit(:name, :test_id)
    end
end
