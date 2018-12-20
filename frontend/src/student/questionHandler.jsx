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
      level: 2,
      category_id: 1,
      selected_answer: null
    }
  }

  componentDidMount = () => {
    this.createSocketTeacher();
    this.createSocketStudent();
  }

  checkAnswer = (number) => {
  }

  createSocketTeacher() {
    let cable = ActionCable.createConsumer(`${API_WS_ROOT}/cable`);

    this.teacherChannel = cable.subscriptions.create ({
      channel: 'TeachersChannel'
    }, {
      connected: () => {},
      received: (data) => {
        if (data.qtext) {
          this.setState({
                 qtext: data.qtext,
                    a1: data.a1,
                    a2: data.a2,
                    a3: data.a3,
                    a4: data.a4,
        correct_answer: data.correct_answer
          });
        }
      }
      // ,
      // rightAnswer: function() {
      //   this.perform('Correct_Answer', {
      //     qtext: this.state.qtext,
      //     answer: this.state.selected_answer
      //   })
      // },
      // incorrectAnswer: function() {
      //   this.perform('Incorrect_Answer', {
      //     qtext: this.state.qtext,
      //     answer: this.state.selected_answer
      //   })
      // }
    });
  }

  createSocketStudent() {
    let cable = ActionCable.createConsumer(`${API_WS_ROOT}/cable`);

    this.studentChannel = cable.subscriptions.create ({
      channel: 'StudentsChannel', name: `{this.props.studentName}`
    }, {
      connected: () => {},
      received: (data) => {
        alert(data)
      }
    });
  }


  render = () => {
    if (!this.state.qtext) {
      return (
        <div>
         <img src={logo} className="App-logo" alt="logo" />
         <button > <h2>The Test Button </h2> </button>
        </div>
      )
    } else {
      return (
        <div>
          <h1> {this.state.qtext} </h1>
          <br/> <br/>
          <button><h3> {this.state.ans1} </h3></button>
          <button><h3> {this.state.ans2} </h3></button>
          <button><h3> {this.state.ans3} </h3></button>
          <button><h3> {this.state.ans4} </h3></button>
        </div>
      )
    }
  }


}

export default QuestionHandler;