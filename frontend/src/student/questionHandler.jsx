import React, { Component } from 'react';
import { API_WS_ROOT } from '../secrets';
import logo from '../logo.svg';
import ActionCable from 'actioncable';


class QuestionHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtext: null,
      a1: null,
      a2: null,
      a3: null,
      a4: null,
      correct_answer: null,
      selected_answer: null,
      level: 2,
      category_id: 1,
      round: 1
    }
  }

  componentDidMount = () => {
    this.createSocketStudent();
  }


  createSocketStudent() {
    let cable = ActionCable.createConsumer(`${API_WS_ROOT}`);

    this.studentChannel = cable.subscriptions.create ({
      channel: 'StudentsChannel', name: this.props.studentName
    }, {
      connected: () => {},
      received: (data) => {
        if (data[0].qtext) {
          this.setState({
            qtext: data[0].qtext,
               a1: data[0].a1,
               a2: data[0].a2,
               a3: data[0].a3,
               a4: data[0].a4,
   correct_answer: data[0].correct_answer
          });
        }
      },
      rightAnswer: function(cat, lvl, round) {
        this.perform('question_send', {
          category: cat,
          level: lvl,
          round: round
        })
      }
    });
  }

  buttonSelector = event => {
    this.setState({selected_answer: event.target.value})
  }

  submitQuestion = () => {
    this.checkAnswer();
    this.studentChannel.rightAnswer(this.state.category_id, this.state.level, this.state.round);
  }

  checkAnswer = () => {
    this.setState({
      category_id: this.nextCategory(this.state.category_id),
            level: this.nextRound(this.state.level),
            round: this.nextLevel(this.state.round, this.state.selected_answer, this.state.correct_answer)
    });
  }

  nextCategory = (currentCategory) => {
    console.log(currentCategory)
    if (currentCategory === 4) {
      return 1;
    } else {
      return currentCategory + 1;
    }
  }

  nextRound = (currentRound) => {
    if (currentRound === 4) {
      return 0;
    } else {
      return currentRound + 1;
    }
  }

  nextLevel = (currentLevel, selected_answer, correct_answer) => {
    console.log(selected_answer, correct_answer)
    if ((selected_answer === correct_answer && currentLevel === 3) || (selected_answer !== correct_answer && currentLevel === 0 )) {
      return currentLevel;
    } else if (selected_answer === correct_answer) {
      return currentLevel + 1;
    } else if (selected_answer !== correct_answer) {
      return currentLevel - 1;
    }
  }



  render = () => {
    if (!this.state.qtext) {
      return (
        <div>
         <img src={logo} className="App-logo" alt="logo" />
         <input type='button' value='Get Question' onClick={this.submitQuestion}>
         </input>
         <h2> {this.state.selected_answer} </h2>
        </div>
      )
    } else {
      return (
        <div>
          <h1> {this.state.qtext} </h1>
          <br/> <br/>
          <form>
            <label>
              <input type='radio' value={this.state.a1}
                checked={this.state.selected_answer === this.state.a1}
                onChange={this.buttonSelector}/>
              {this.state.a1}
            </label>
            <p/>
            <label>
              <input type='radio' value={this.state.a2}
                checked={this.state.selected_answer === this.state.a2}
                onChange={this.buttonSelector}/>
              {this.state.a2}
            </label>
            <p/>
            <label>
              <input type='radio' value={this.state.a3}
                checked={this.state.selected_answer === this.state.a3}
                onChange={this.buttonSelector}/>
              {this.state.a3}
            </label>
            <p/>
            <label>
              <input type='radio' value={this.state.a4}
              checked={this.state.selected_answer === this.state.a4}
              onChange={this.buttonSelector}/>
              {this.state.a4}
            </label>
            <p/>
            <button onClick={this.submitQuestion}> SUBMIT! </button>
          </form>
        </div>
      )
    }
  }


}

export default QuestionHandler;