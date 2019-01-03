import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons';

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

// Icons can be changed based on that array, the larger the
// array, the more buttons
  makeTestGrader = (student) => {
    const icons = ["(╯°□°）╯︵ ┻━┻", "☜(⌒▽⌒)☞", "ヽ(´▽`)/", "(◠﹏◠)", "(ง'̀-'́)ง"]
    return (
      <tr>
        <td>{student.name}</td>
        <td>{this.numberCorrect(student[1])} / {student[1].length}</td>
        <td>{this.numberCorrect(student[2])} / {student[2].length}</td>
        <td>{this.numberCorrect(student[3])} / {student[3].length}</td>
        <td>{this.numberCorrect(student[4])} / {student[4].length}</td>
        <td>{this.calculateTotal(student)} / {this.totalQuestions(student)}</td>
        <td>
          {icons.map((icon) => (
            <StudentMessageButtons
              student={student}
              sendMessage={this.props.sendMessage}
              icon={icon}
            />
          ))}
        </td>
      </tr>
    )
  }


  render = () => {

    const studentStats = this.props.students.map((student) =>
      this.makeTestGrader(student)
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
          <th> Message </th>
        </tr>
        {studentStats}
      </table>
    )
  }
}

export default StudentStatsTable;