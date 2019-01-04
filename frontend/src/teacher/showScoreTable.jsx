import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons'

class ShowScoreTable extends Component {

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

  levelNumberCorrect = (categoryAnswers) => {
    let correct = 0
    categoryAnswers.map((answer) => {
      if (answer === true) {
        correct ++;
      }
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

  levelCalculateTotal = (student, level) => {
    return (this.levelNumberCorrect(student[1][level]) + this.levelNumberCorrect(student[2][level]) + this.levelNumberCorrect(student[3][level]) + this.levelNumberCorrect(student[4][level]))
  }

  totalQuestions = (student) => {
    return (this.numberOfQuestions(student[1]) + this.numberOfQuestions(student[2]) + this.numberOfQuestions(student[3]) + this.numberOfQuestions(student[4]))
  }

  levelTotalQuestions = (student, level) => {
    return (student[1][level].length + student[2][level].length + student[3][level].length + student[4][level].length)
  }
  showDetailedScores = () => {
    this.props.showLevels(this.props.student.id)
  }

  hideDetailedScores = () => {
    this.props.hideLevels()
  }



  render = () => {
    const student = this.props.student
    const icons = this.props.icons
    const levels = [ 0, 1, 2 ]
    const category = [ 1, 2, 3, 4 ]

    if (this.props.selectedStudent === student.id) {
      return (
        <React.Fragment>
          <tr onClick={this.hideDetailedScores}>
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
          <tr>
            <th scope="row"> level 2 </th>
            <td>{this.levelNumberCorrect(student[1][2])} / {student[1][2].length}</td>
            <td>{this.levelNumberCorrect(student[2][2])} / {student[2][2].length}</td>
            <td>{this.levelNumberCorrect(student[3][2])} / {student[3][2].length}</td>
            <td>{this.levelNumberCorrect(student[4][2])} / {student[4][2].length}</td>
            <td>{this.levelCalculateTotal(student, 2)} / {this.levelTotalQuestions(student, 2)}</td>
          </tr>
          <tr>
            <th scope="row"> level 1 </th>
            <td>{this.levelNumberCorrect(student[1][1])} / {student[1][1].length}</td>
            <td>{this.levelNumberCorrect(student[2][1])} / {student[2][1].length}</td>
            <td>{this.levelNumberCorrect(student[3][1])} / {student[3][1].length}</td>
            <td>{this.levelNumberCorrect(student[4][1])} / {student[4][1].length}</td>
            <td>{this.levelCalculateTotal(student, 1)} / {this.levelTotalQuestions(student, 1)}</td>
          </tr>
          <tr>
            <th scope="row"> level 0 </th>
            <td>{this.levelNumberCorrect(student[1][0])} / {student[1][0].length}</td>
            <td>{this.levelNumberCorrect(student[2][0])} / {student[2][0].length}</td>
            <td>{this.levelNumberCorrect(student[3][0])} / {student[3][0].length}</td>
            <td>{this.levelNumberCorrect(student[4][0])} / {student[4][0].length}</td>
            <td>{this.levelCalculateTotal(student, 0)} / {this.levelTotalQuestions(student, 0)}</td>
          </tr>
        </React.Fragment>
      )
    } else {
      return (
        <tr onClick={this.showDetailedScores} >
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

}

export default ShowScoreTable;