import React, { Component } from 'react';


class CreateTotalCell extends Component {

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


  render = () => {
    const student = this.props.student
    const level = this.props.level

    if (level || level === 0 ) {
      return (
        <td>{this.calculateTotalCorrectByLevel(student, level)} / {this.totalQuestionsAnsweredByLevel(student, level)}</td>
      )
    } else {
      return (
        <td>{this.calculateTotalCorrect(student)} / {this.totalQuestionsAnswered(student)}</td>
      )
    }
  }

}

export default CreateTotalCell;