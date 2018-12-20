class TestsController < ApplicationController

    def create
    test = Test.create(user_params)
    end

    def show
      @test = Test.find(name: params[:id])
      render json: @test
    end

  private
    def user_params
      params.require(:test).permit(:name, :teacher_id)
    end
end
