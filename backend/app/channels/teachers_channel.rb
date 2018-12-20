class TeachersChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "teachers_channel"
  end

  ## Outbound messages to teachers..

  # change the state of the student object for the teacher as new students come online
  def who_is_online
  end

  # broadcast the update to the individual student scoreboard (right, wrong, category and level)
  def student_answer
  end

  # INBound messages

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
