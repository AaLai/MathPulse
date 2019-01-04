import React, { Component } from 'react';

// Creates each row that contains individual scores
class CreateScoreRow extends Component {

  render = () => {
    const student = this.props.student
    const category = this.props.category
    const level = this.props.level


    if (level || level === 0 ) {
      return (
        <td>{this.props.numberCorrectByLevel(student[category][level])} / {student[category][level].length}</td>
      )
    } else {
      return (
        <td>{this.props.numberCorrect(student[category])} / {this.props.numberOfQuestionsAnswered(student[category])}</td>
      )
    }
  }
}

export default CreateScoreRow;