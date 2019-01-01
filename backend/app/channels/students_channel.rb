class StudentsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    ## Changed find_by(id: ...) to find_by(name: ...) allows individual
    ## channels
    @student = Student.find_by(name: params[:name])
    stream_for @student
    is_online = [@student.id, @student.name]
    ActionCable.server.broadcast 'teachers_channel', is_online
  end

  # Outbound to students
  # Send the individual student their question


  # change the state of the student object for the teacher as new students come online
  def who_is_online
    # call from a student when they are online
    #pull in student name
    #broadcast out student name is online to Teacher channel
  end

  def question_send(data)
    next_question = Question.where(category: data["category"]).where(level: data["level"]).where(round: data["round"])
    StudentsChannel.broadcast_to @student, next_question
  end

  # Inbound from students
  def student_answer (data)
    answer_data = [data[@student.id], data["category"], data["level"], data["right_ans"], data["wrong_ans"]]
    ActionCable.server.broadcast 'teachers_channel', answer_data
    # take in from the student the Category and Level it wants next
    # pass over to question_send to send the next question with those parameters
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
