class TeachersChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "teachers_channel"
  end

  # change the state of the student object for the teacher as new students come online
  def who_is_online
  end

  # takes in the info from REACT and then broadcasts it to the scoreboard

  # INBound messages from Teachers
  def start_test
  end

  def end_test
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
