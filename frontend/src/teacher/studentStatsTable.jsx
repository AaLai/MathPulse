import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons';
import ShowGradeTable from './showGradeTable';

class StudentStatsTable extends Component {

  numberCorrect = (categoryAnswers) => {
    let correct = 0
    categoryAnswers.map((answer) => {
      answer.map((levelAnswer) => {
        if (levelAnswer === true) {
          correct ++;
        }
      })
    });
    return correct;
  }


  numberOfQuestions = (category) => {
    let number = 0
    category.map((answer) => {
      number = number + answer.length
    })
    return number;
  }

  calculateTotal = (student) => {
    return (this.numberCorrect(student[1]) + this.numberCorrect(student[2]) + this.numberCorrect(student[3]) + this.numberCorrect(student[4]))
  }

  totalQuestions = (student) => {
    return (this.numberOfQuestions(student[1]) + this.numberOfQuestions(student[2]) + this.numberOfQuestions(student[3]) + this.numberOfQuestions(student[4]) )
  }

  showTestScores = (studentID) => {
    this.setState({ selectedStudent: studentID })
  }

  hideTestScores = () => {
    this.setState({ selectedStudent: null })
  }

// Icons can be changed based on that array, the larger the
// array, the more buttons
  makeTestGrader = (student) => {
    const icons = ["👏", "🧠", "💯", "👍", "🐳"]
    const categories = [ 1, 2, 3, 4]
    return (
      <ShowGradeTable
        student={student}
        sendMessage={this.props.sendMessage}
        icons={icons}
      />
    )
  }


  render = () => {

    const studentStats = this.props.students.map((student) =>
      this.makeTestGrader(student)
    );

    return (
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col"> Name </th>
          <th scope="col"> Exponents </th>
          <th scope="col"> Fractions </th>
          <th scope="col"> BEDMAS </th>
          <th scope="col"> Algebra </th>
          <th scope="col"> Total </th>
          <th scope="col"> Message </th>
        </tr>
        </thead>
        {studentStats}
      </table>
    )
  }
}

export default StudentStatsTable;