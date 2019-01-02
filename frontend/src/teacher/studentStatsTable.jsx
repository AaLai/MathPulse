import React, { Component } from 'react';

class StudentStatsTable extends Component {

  numberCorrect = (categoryAnswers) => {
    let correct = 0
    categoryAnswers.map((answer) => {
      if (answer === true) {
        correct ++;
      }
    });
    return correct;
  }

  calculateTotal = (student) => {
    return (this.numberCorrect(student[1]) + this.numberCorrect(student[2]) + this.numberCorrect(student[3]) + this.numberCorrect(student[4]))
  }

  totalQuestions = (student) => {
    return (student[1].length + student[2].length + student[3].length + student[4].length)
  }


  render = () => {

    const studentStats = this.props.students.map((student) =>
      <tr>
        <td>{student.name}</td>
        <td>{this.numberCorrect(student[1])} / {student[1].length}</td>
        <td>{this.numberCorrect(student[2])} / {student[2].length}</td>
        <td>{this.numberCorrect(student[3])} / {student[3].length}</td>
        <td>{this.numberCorrect(student[4])} / {student[4].length}</td>
        <td>{this.calculateTotal(student)} / {this.totalQuestions(student)}</td>
      </tr>
    );

    return (
      <table>
        <tr>
          <th> Name </th>
          <th> Exponents </th>
          <th> Fractions </th>
          <th> BEDMAS </th>
          <th> Algebra </th>
          <th> Total </th>
        </tr>
        {studentStats}
      </table>
    )
  }
}

export default StudentStatsTable;