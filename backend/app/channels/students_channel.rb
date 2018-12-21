class StudentsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @student = Student.find_by(id: params[:name])
    stream_for @student
  end

  # Outbound to students
  # Send the individual student their question
  def fakeq
    the_question = Question.first
    @student = Student.find_by(id: params[:name])
    StudentsChannel.broadcast_to @student, the_question
  end

  def question_send(category, level)
    next_question = Question.where(category: category).where(level: level)
    StudentsChannel.broadcast_to @student, next_question
  end

  # Inbound from students
  def student_answer (category, level, right_ans, wrong_ans)
    answer_data = [@student, category, level, right_ans, wrong_ans]
    ActionCable.server.broadcast 'teachers_channel', answer_data
    # take in from the student the Category and Level it wants next
    # pass over to question_send to send the next question with those parameters
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
