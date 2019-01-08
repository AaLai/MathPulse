import React, { Component } from 'react';

// Handles logic and display for the cells showing
// category or level totals in the summary row
class CreateSummaryTotalCell extends Component {

  totalCorrectAnswers = () => {
    let total = 0;
    this.props.categories.map((category) => {
      this.props.students.map((student) => {
        student[category].map((level) => {
          level.map((answer) => {
            if (answer === true) {
              total ++;
            }
          })
        })
      })
    })
    return total;
  }

  totalQuestionsAnswered = () => {
    let total = 0;
    this.props.categories.map((category) => {
      this.props.students.map((student) => {
        student[category].map((level) => {
          total += level.length
        })
      })
    })
    return total;
  }

  totalCorrectAnswersByLevel = (level) => {
    let total = 0
    this.props.students.map((student) => {
      this.props.categories.map((category) => {
        student[category][level].map((answer) => {
          if (answer === true) {
            total ++;
          }
        })
      })
    })
    return total;
  }

  totalQuestionsAnsweredByLevel = (level) => {
    let total = 0
    this.props.students.map((student) => {
      this.props.categories.map((category) => {
        total += student[category][level].length
      })
    })
    return total;
  }

  render = () => {
    const level = this.props.level

    if ( level || level === 0 ) {
      return (
        <td>{this.totalCorrectAnswersByLevel(level)} / {this.totalQuestionsAnsweredByLevel(level)}</td>
      )
    } else {
      return (
        <td>{this.totalCorrectAnswers()} / {this.totalQuestionsAnswered()}</td>
      )
    }
  }
}

export default CreateSummaryTotalCell;