import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons';
import CreateScoreRow from './createScoreRow';

// Puts together the parts that make up a row on the score table
class CreateScoreTable extends Component {

// Used for calculating correct answers
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

  numberCorrectByLevel = (categoryAnswers) => {
    let correct = 0
    categoryAnswers.map((answer) => {
      if (answer === true) {
        correct ++;
      }
    });
    return correct;
  }

  numberOfQuestionsAnswered = (category) => {
    let number = 0
    category.map((answer) => {
      number += answer.length
    })
    return number;
  }

  calculateTotalCorrect = (student) => {
    let total = 0
    this.props.categories.map((category) => {
      total += this.numberCorrect(student[category])
    })
    return total;
  }

  calculateTotalCorrectByLevel = (student, level) => {
    let total = 0
    this.props.categories.map((category) => {
      total += this.numberCorrectByLevel(student[category][level])
    })
    return total;
  }

  totalQuestionsAnswered = (student) => {
    let total = 0
    this.props.categories.map((category) => {
      total += this.numberOfQuestionsAnswered(student[category])
    })
    return total;
  }

  totalQuestionsAnsweredByLevel = (student, level) => {
    let total = 0
    this.props.categories.map((category) => {
      total += student[category][level].length
    })
    return total;
  }

// Hides and shows the levels score table
  showDetailedScores = () => {
    this.props.showLevels(this.props.student.id)
  }

  hideDetailedScores = () => {
    this.props.hideLevels()
  }


  render = () => {
    const student = this.props.student
    const icons = this.props.icons
    const levels = this.props.levels
    const categories = this.props.categories

    if (this.props.selectedStudent === student.id && this.props.testEnd) {
      return (
        <React.Fragment>
          <tr onClick={this.hideDetailedScores}>
            <th scope="row">{student.name}</th>
            {categories.map((category) => (
              <CreateScoreRow
                student={student}
                category={category}
                numberCorrectByLevel={this.numberCorrectByLevel}
                numberCorrect={this.numberCorrect}
                numberOfQuestionsAnswered={this.numberOfQuestionsAnswered}
              />
            ))}
            <td>{this.calculateTotalCorrect(student)} / {this.totalQuestionsAnswered(student)}</td>
          </tr>
          {levels.map((level) => (
            <tr>
              <td> Level {level} </td>
              {categories.map((category) => (
                <CreateScoreRow
                  student={student}
                  level={level}
                  category={category}
                  numberCorrectByLevel={this.numberCorrectByLevel}
                  numberCorrect={this.numberCorrect}
                  numberOfQuestionsAnswered={this.numberOfQuestionsAnswered}
                />
              ))}
              <td>{this.calculateTotalCorrectByLevel(student, level)} / {this.totalQuestionsAnsweredByLevel(student, level)}</td>
            </tr>
          ))}
        </React.Fragment>
      )
    } else if (this.props.testEnd) {
      return (
        <tr onClick={this.showDetailedScores}>
          <th scope="row">{student.name}</th>
          {categories.map((category) => (
            <CreateScoreRow
              student={student}
              category={category}
              numberCorrectByLevel={this.numberCorrectByLevel}
              numberCorrect={this.numberCorrect}
              numberOfQuestionsAnswered={this.numberOfQuestionsAnswered}
            />
          ))}
          <td>{this.calculateTotalCorrect(student)} / {this.totalQuestionsAnswered(student)}</td>
        </tr>
      )
    } else if (this.props.selectedStudent === student.id) {
      return (
        <React.Fragment>
          <tr onClick={this.hideDetailedScores}>
            <th scope="row">{student.name}</th>
            {categories.map((category) => (
              <CreateScoreRow
                student={student}
                category={category}
                numberCorrectByLevel={this.numberCorrectByLevel}
                numberCorrect={this.numberCorrect}
                numberOfQuestionsAnswered={this.numberOfQuestionsAnswered}
              />
            ))}
            <td>{this.calculateTotalCorrect(student)} / {this.totalQuestionsAnswered(student)}</td>
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
          {levels.map((level) => (
            <tr>
              <td> Level {level} </td>
              {categories.map((category) => (
                <CreateScoreRow
                  student={student}
                  level={level}
                  category={category}
                  numberCorrectByLevel={this.numberCorrectByLevel}
                  numberCorrect={this.numberCorrect}
                  numberOfQuestionsAnswered={this.numberOfQuestionsAnswered}
                />
              ))}
              <td>{this.calculateTotalCorrectByLevel(student, level)} / {this.totalQuestionsAnsweredByLevel(student, level)}</td>
            </tr>
          ))}
        </React.Fragment>
      )
    } else {
      return (
        <tr onClick={this.showDetailedScores}>
          <th scope="row">{student.name}</th>
          {categories.map((category) => (
            <CreateScoreRow
              student={student}
              category={category}
              numberCorrectByLevel={this.numberCorrectByLevel}
              numberCorrect={this.numberCorrect}
              numberOfQuestionsAnswered={this.numberOfQuestionsAnswered}
            />
          ))}
          <td>{this.calculateTotalCorrect(student)} / {this.totalQuestionsAnswered(student)}</td>
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

export default CreateScoreTable;