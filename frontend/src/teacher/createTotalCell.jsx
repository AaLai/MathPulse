import React, { Component } from 'react';

// Handles logic and display for the cells showing
// category or level totals
class CreateTotalCell extends Component {

// helper functions for calculating totals
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
      number += answer.length;
    });
    return number;
  }

// functions for calculating totals
  totalQuestionsCorrect = (student) => {
    let total = 0
    this.props.categories.map((category) => {
      total += this.numberCorrect(student[category]);
    });
    return total;
  }

  totalQuestionsCorrectByLevel = (student, level) => {
    let total = 0
    this.props.categories.map((category) => {
      total += this.numberCorrectByLevel(student[category][level]);
    })
    return total;
  }

  totalQuestionsAnswered = (student) => {
    let total = 0
    this.props.categories.map((category) => {
      total += this.numberOfQuestionsAnswered(student[category]);
    });
    return total;
  }

  totalQuestionsAnsweredByLevel = (student, level) => {
    let total = 0
    this.props.categories.map((category) => {
      total += student[category][level].length;
    });
    return total;
  }


  render = () => {
    const student = this.props.student
    const level = this.props.level

    if (level || level === 0 ) {
      return (
        <td>{this.totalQuestionsCorrectByLevel(student, level)} / {this.totalQuestionsAnsweredByLevel(student, level)}</td>
      )
    } else {
      return (
        <td>{this.totalQuestionsCorrect(student)} / {this.totalQuestionsAnswered(student)}</td>
      )
    }
  }

}

export default CreateTotalCell;