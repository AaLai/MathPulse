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
      level: 3,
      category_id: 1,
      selected_answer: null
    }
  }

  componentDidMount = () => {
    this.createSocketTeacher();
    this.createSocketStudent();
  }


  createSocketTeacher() {
    let cable = ActionCable.createConsumer(`${API_WS_ROOT}/cable`);

    this.teacherChannel = cable.subscriptions.create ({
      channel: 'TeachersChannel'
    }, {
      connected: () => {},
      received: (data) => {
        alert(data)
      }
    });
  }

  createSocketStudent() {
    let cable = ActionCable.createConsumer(`${API_WS_ROOT}/cable`);

    this.studentChannel = cable.subscriptions.create ({
      channel: 'StudentsChannel', name: `{this.props.studentName}`
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
      },
      rightAnswer: function() {
        this.perform('fakeq', {
          qtext: "this.state.qtext"
        })
      }
    });
  }

  handleChange = event => {
    this.setState({selected_answer: event.target.value});
    this.studentChannel.rightAnswer();
  }

  render = () => {
    if (!this.state.qtext) {
      return (
        <div>
         <img src={logo} className="App-logo" alt="logo" />
         <input type='button' value={this.state.a1} onClick={this.handleChange}>
         </input>
         <h2> {this.state.selected_answer} </h2>
        </div>
      )
    } else {
      return (
        <div>
          <h1> {this.state.qtext} </h1>
          <br/> <br/>
          <input type='button' value={this.state.a1} onClick={this.handleChange}>
          </input>
          <p/>
          <input type='button' value={this.state.a2} onClick={this.handleChange}>
          </input>
          <p/>
          <input type='button' value={this.state.a3} onClick={this.handleChange}>
          </input>
          <p/>
          <input type='button' value={this.state.a4} onClick={this.handleChange}>
          </input>
        </div>
      )
    }
  }


}

export default QuestionHandler;