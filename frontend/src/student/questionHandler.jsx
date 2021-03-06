import React, { Component } from 'react';
import { API_WS_ROOT } from '../secrets';
import logo from '../images/logo.svg';
import ActionCable from 'actioncable';
import corgi from '../images/corgiFinisher.jpg'
import standby from '../images/standby.jpeg'

// Main component for students
// Handles websocket and question logic
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
                round: 1,
        questionTimer: null,
              message: null,
         messageTimer: null,
             testOver: null,
                pause: null,
   questionAlertTimer: null,
 questionAlertMessage: null,
              animate: null
    }
  }

  componentDidMount = () => {
    this.createSocketStudent();
  }

// Handles state changes needed to animate questions
  componentDidUpdate = (prevProps, prevState) => {
    const currentLevel = this.state.level
    const currentCategory = this.state.category_id
    if (prevState.level !== currentLevel || prevState.category_id !== currentCategory ) {
      setTimeout( this.animateQuestion, 500)
      this.setState({ animate: true })
    }
  }


  createSocketStudent() {
    let cable = ActionCable.createConsumer(`${API_WS_ROOT}`);

    this.studentChannel = cable.subscriptions.create ({
      channel: 'StudentsChannel', name: this.props.studentName
    }, {
      connected: () => {},
      received: (data) => {
        if (data.length === 2) {
// Test end functionality
          this.setState({ testOver: true });
          clearInterval(this.state.questionTimer);
          clearInterval(this.state.questionAlertTimer);
        } else if (data.length === 3) {
// Pause and unpause functionality
          if (data[0] === 'pause') {
            this.setState({ pause: true });
            clearInterval(this.state.questionTimer);
            clearInterval(this.state.questionAlertTimer);
          } else {
            const questionTimer = setInterval(this.submitQuestion, 25000);
            const alertTimer = setInterval(this.questionAlertMessage, 10000);
            this.setState({
           questionAlertTimer: alertTimer,
                questionTimer: questionTimer,
                        pause: null
            });
          }
        } else if (!data[0].qtext) {
// This causes a teacher sent icon to pop up for 2 seconds
// below the test
          const messageTimer = setTimeout(this.deleteMessage, 2000);
          this.setState({
            message: data[0],
       messageTimer: messageTimer
          })
        } else if (data[0].qtext) {
// Question timer is in here, multiple timers can stack
// Thus the clear interval
          if (this.state.questionTimer) {
            clearInterval(this.state.questionTimer);
            clearInterval(this.state.questionAlertTimer);
          }
          const questionTimer = setInterval(this.submitQuestion, 25000);
          const alertTimer = setInterval(this.questionAlertMessage, 10000);
          this.setState({
                 qtext: data[0].qtext,
                    a1: data[0].a1,
                    a2: data[0].a2,
                    a3: data[0].a3,
                    a4: data[0].a4,
        correct_answer: data[0].correct_answer,
                 level: data[0].level,
           category_id: data[0].category_id,
                 round: data[0].round,
         questionTimer: questionTimer,
       selected_answer: null,
  questionAlertMessage: null,
    questionAlertTimer: alertTimer
          });
        }
      },
      getQuestion: function(cat, lvl, round) {
        this.perform('question_send', {
          category: cat,
             level: lvl,
             round: round
        });
      },
      sendAnswer: function(cat, lvl, selectedAnswer, correctAnswer) {
        if ( selectedAnswer === correctAnswer) {
          this.perform('student_answer', {
             category: cat,
                level: lvl,
            right_ans: true,
            wrong_ans: null
          });
        } else {
          this.perform('student_answer', {
             category: cat,
                level: lvl,
            right_ans: null,
            wrong_ans: true
          });
        }
      }
    });
  }

  animateQuestion = () => {
    this.setState({animate: null});
  }

  buttonSelector = event => {
    this.setState({selected_answer: event.target.value});
  }

// Submits current question and grabs the next question from server
  submitQuestion = () => {
    const answerIsCorrect = this.answerChecker();
    const nextCategory = this.nextCategory(this.state.category_id, this.state.level, answerIsCorrect);
    const nextRound = this.nextRound(this.state.round, this.state.category_id, this.state.level, answerIsCorrect);
    const nextLevel = this.nextLevel(this.state.level, answerIsCorrect);
    this.studentChannel.sendAnswer(this.state.category_id, this.state.level, this.state.selected_answer, this.state.correct_answer);
    this.studentChannel.getQuestion(nextCategory, nextLevel, nextRound);
  }

// Functions for getting the next question
  nextCategory = (currentCategory, currentLevel, answerIsCorrect) => {
    if (currentCategory === 4 && !answerIsCorrect) {
      if (currentLevel === 0 || currentLevel === 3) {
        return 1;
      } else {
        return currentCategory;
      }
    } else if (currentCategory === 4 && answerIsCorrect) {
      if (currentLevel === 2) {
        return currentCategory;
      } else {
        return 1;
      }
    } else if (currentLevel === 3) {
      return currentCategory + 1;
    } else if (currentLevel === 2 && answerIsCorrect) {
      return currentCategory;
    } else if (answerIsCorrect) {
      return currentCategory + 1;
    } else if (!answerIsCorrect && currentLevel === 0) {
      return currentCategory + 1;
    } else {
      return currentCategory;
    }
  }


  nextRound = (currentRound, currentCategory, currentLevel, answerIsCorrect) => {
    if (currentCategory === 4 && currentRound === 4) {
      return 0;
    } else if (currentCategory === 4 && answerIsCorrect) {
      return currentRound + 1;
    } else if (currentCategory === 4 && currentLevel === 0 && !answerIsCorrect) {
      return currentRound + 1;
    } else {
      return currentRound;
    }
  }

  nextLevel = (currentLevel, answerIsCorrect) => {
    if (currentLevel === 3) {
      return 2;
    } else if (currentLevel === 2 && answerIsCorrect) {
      return 3;
    } else if (!answerIsCorrect && currentLevel === 0 ) {
      return 2;
    } else if (answerIsCorrect) {
      return 2;
    } else if (!answerIsCorrect) {
      return currentLevel - 1;
    }
  }

  answerChecker = () => {
    if (this.state.correct_answer === this.state.selected_answer) {
      return true;
    }
    return false;
  }

// Functions to handle teacher message and question timer message
  deleteMessage = () => {
    clearInterval(this.state.messageTimer);
    this.setState({message: null});
  }

  questionAlertMessage = () => {
    clearInterval(this.state.questionAlertTimer);
    this.setState({ questionAlertMessage: "Keep trying for a few more seconds, then we'll move to the next question" });
  }

// Creates answer buttons based
  CreateAnswerButtons = (props) => {
    const answerNum = [ 'a1', 'a2', 'a3', 'a4' ]
    return (
      <form className="question">
        {answerNum.map((answer) => {
          return(
            <React.Fragment>
              <label >
                <input type='radio' value={this.state[answer]}
                  checked={this.state.selected_answer === this.state[answer]}
                  onChange={this.buttonSelector}/>
                {this.state[answer]}
              </label>
              <p/>
            </React.Fragment>
          )
        })}
      </form>
    )
  }


  render = () => {

    const styleObject = { marginLeft: 10};
    if (this.state.testOver) {
      return (
        <img src={corgi} class="corgiFinish" />
      )
    } else if (this.state.pause) {
      return (
        <div>
          <h3>Your teacher has paused the test...</h3>
          <br/>
          <img src={standby} class="standBy"/>
        </div>
      )
    } else if (!this.state.qtext) {
      return (
        <div>
         <h3>Waiting for the Test to Start</h3>
         <p>(hold your phone up so your Teacher knows you're ready)</p>
         <img src={logo} className="App-logo" alt="logo" />
        </div>
      )
    } else {
      return (
        <div class={this.state.animate ? "questionStart" : "questionEnd"}>
          <h3> {this.state.qtext} </h3>

          {this.state.questionAlertMessage}
          <this.CreateAnswerButtons />
          <button class="btn btn-info" style={styleObject} onClick={this.submitQuestion}> Submit </button>
          <div>
            <h3> {this.state.message} </h3>
          </div>

        </div>
      )
    }
  }


}

export default QuestionHandler;