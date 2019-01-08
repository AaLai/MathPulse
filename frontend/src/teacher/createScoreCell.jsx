import React, { Component } from 'react';

// Creates a cell that contains individual scores for
// category or level
class CreateScoreCell extends Component {

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

// Decides whether to make a category or level cell based on
// if a level props is passed down
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