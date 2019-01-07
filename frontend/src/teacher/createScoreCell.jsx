import React, { Component } from 'react';

// Creates each cell that contains individual scores
class CreateScoreCell extends Component {

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


  render = () => {
    const student = this.props.student
    const category = this.props.category
    const level = this.props.level

    if (level || level === 0 ) {
      return (
        <td>{this.numberCorrectByLevel(student[category][level])} / {student[category][level].length}</td>
      )
    } else {
      return (
        <td>{this.numberCorrect(student[category])} / {this.numberOfQuestionsAnswered(student[category])}</td>
      )
    }
  }
}

export default CreateScoreCell;