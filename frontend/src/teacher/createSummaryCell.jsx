import React, { Component } from 'react';

// Calculations for category and level summary cells
class CreateSummaryCell extends Component {

  totalCorrectAnswersByCategory = (category) => {
    let total = 0;
    this.props.students.map((student) => {
      student[category].map((level) => {
        level.map((answer) => {
          if (answer === true) {
            total ++;
          }
        })
      })
    })
    return total;
  }

  totalAnswersByCategory = (category) => {
    let total = 0;
    this.props.students.map((student) => {
      student[category].map((level) => {
        total += level.length
      })
    })
    return total;
  }

  totalCorrectAnswersByCategoryLevel = (category, level) => {
    let total = 0;
    this.props.students.map((student) => {
      student[category][level].map((answer) => {
        if (answer === true) {
          total ++;
        }
      })
    })
    return total;
  }

  totalAnswersByCategoryLevel = (category, level) => {
    let total = 0;
    this.props.students.map((student) => {
      total += student[category][level].length
    })
    return total;
  }

// Decides whether to make a category or level cell based on
// if a level props is passed down
  render = () => {
    if ( this.props.level || this.props.level === 0 ) {
      return (
        <td>{this.totalCorrectAnswersByCategoryLevel(this.props.category, this.props.level)} / {this.totalAnswersByCategoryLevel(this.props.category, this.props.level)}</td>
      )
    } else {
      return (
        <td>{this.totalCorrectAnswersByCategory(this.props.category)} / {this.totalAnswersByCategory(this.props.category)}</td>
      )
    }
  }
}

export default CreateSummaryCell;