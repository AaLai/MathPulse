class StudentsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "student_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
