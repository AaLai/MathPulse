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
      level: 3,
      category_id: 1,
      round: 0
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

  handleChange = event => {
    let x = this.state.category_id + 1
    this.setState({selected_answer: event.target.value,
                       category_id: x});
    this.studentChannel.rightAnswer(this.state.category_id, this.state.level, this.state.round);
  }

  render = () => {
    if (!this.state.qtext) {
      return (
        <div>
         <img src={logo} className="App-logo" alt="logo" />
         <input type='button' value='Get Question' onClick={this.handleChange}>
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