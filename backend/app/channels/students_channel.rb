class StudentsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @student = Student.find_by(id: params[:name])
    stream_for @student
  end

  # Change student display to big Green checkmark
  def welcome
  end

  # Send the individual student their question
  def question_send
  end

  # End the test for ALL students
  def end_test
  end



##
#  def received(data)
#    @teacher = how to we set this to go to the Teacher channel
#    StudentsChannel.broadcast_to ( @teacher, #{and then what data goes here} )
#   end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
