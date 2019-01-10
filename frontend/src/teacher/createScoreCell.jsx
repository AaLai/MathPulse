import React, { Component } from 'react';

// Creates a cell that contains individual scores for
// category or level
class CreateScoreCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
                  update: 0,
                 animate: false,
               lastTotal: false
                 }
  }

// Logic for notification animation
// setTimeout changes animation length
  componentDidMount = () => {
    if (!this.props.testEnd) {
      if (this.props.level || this.props.level === 0 ) {
        const currentTotal = this.props.student[this.props.category][this.props.level].length
        this.setState({ lastTotal: currentTotal })
      }
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!this.props.testEnd) {
      const currentLevel = this.props.level
      const currentCategory = this.props.category
      const currentStudent = this.props.student

      if ( currentLevel || currentLevel === 0 ) {
        const currentTotal = currentStudent[currentCategory][currentLevel].length
        this.animateAnswerCell(currentTotal);
      } else if ( this.props.levelsHidden ) {
        const currentTotal = this.numberOfQuestionsAnswered(currentStudent[currentCategory])
        this.animateAnswerCell(currentTotal);
      } else if ( this.state.lastTotal != this.numberOfQuestionsAnswered(currentStudent[currentCategory])) {
        const currentTotal = this.numberOfQuestionsAnswered(currentStudent[currentCategory])
        this.setState ({ lastTotal: currentTotal })
      }
    }
  }

  fadeOut = () => {
    this.setState({ animate: false })
  }

  animateAnswerCell = (currentTotal) => {
    if (this.state.lastTotal != currentTotal) {
      if (this.state.update === 0 ) {
        const newUpdate = this.state.update + 1
        this.setState({ update: newUpdate })
      } else {
        setTimeout( this.fadeOut, 500);
        const newUpdate = this.state.update + 1
        this.setState({ update: newUpdate,
                       animate: true,
                     lastTotal: currentTotal
                      })
      }
    }
  }

// Calculates the numbers displayed in the cell
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
        <td key={student+category+level} class={this.state.animate ? "toGreen" : "toWhite"}>{this.numberCorrectByLevel(student[category][level])} / {student[category][level].length}</td>
      )
    } else {
      return (
        <td key={student+category} class={this.state.animate ? "toGreen" : "toWhite"}>{this.numberCorrect(student[category])} / {this.numberOfQuestionsAnswered(student[category])}</td>
      )
    }
  }
}

export default CreateScoreCell;