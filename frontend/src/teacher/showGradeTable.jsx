import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons'

class ShowGradeTable extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedStudent: null }
  }

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

  render = () => {
    const student = this.props.student
    const icons = this.props.icons
    return (
      <tr >
        <th scope="row">{student.name}</th>
        <td>{this.numberCorrect(student[1])} / {this.numberOfQuestions(student[1])}</td>
        <td>{this.numberCorrect(student[2])} / {this.numberOfQuestions(student[2])}</td>
        <td>{this.numberCorrect(student[3])} / {this.numberOfQuestions(student[3])}</td>
        <td>{this.numberCorrect(student[4])} / {this.numberOfQuestions(student[4])}</td>
        <td>{this.calculateTotal(student)} / {this.totalQuestions(student)}</td>
        <td>
          {icons.map((icon) => (
            <StudentMessageButtons
              student={this.props.student}
              sendMessage={this.props.sendMessage}
              icon={icon}
            />
          ))}
        </td>
      </tr>
    )
  }

}

export default ShowGradeTable;