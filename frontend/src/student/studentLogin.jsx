import React from 'react';
import Cookies from 'universal-cookie';
import { API_ROOT, HEADERS } from '../secrets';
import QuestionHandler from './questionHandler'
const cookies = new Cookies();

class StudentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testID: null,
      name: null,
      formField: null
    }
  }

  handleChange = form => {
    this.setState({ formField: form.target.value });
  };


  handleSubmitTestID = form => {
    form.preventDefault();
    const test = this.state.formField
    fetch(`${API_ROOT}/tests/${test}/`)
      .then (res => {
        if (res.ok) {
          res.json()
          .then( testdata => {
            if (testdata !== null) {
              this.setState({ testID: testdata.id,
                           formField: null});
            } else {
              alert('That test doesn\'t exist, please try again')
            }
          })
        }
      })
  };

  handleSubmitName = form => {
    form.preventDefault();
    fetch(`${API_ROOT}/students`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        name: this.state.formField,
        test_id: this.state.testID
      })
    }).then( resp => {
      if (resp.ok) {
        this.setState({greenCircleOfDeath: 'ok',
                                     name: this.state.formField,
                                formField: null});
      }
    })
  }


  render = () => {
    if (!this.state.testID) {
      return (
        <div>
          <form onSubmit={this.handleSubmitTestID}>
            <label>Please enter the test ID</label>
            <br />
            <input
              type='text'
              placeholder='Please enter your testID!'
              onChange={this.handleChange}
            />
            <input type='submit' />
          </form>
        </div>
      );
    } else if (!this.state.name) {
      return (
        <div>
        <h2> Awesome, now please enter your name </h2>
          <form onSubmit={this.handleSubmitName}>
            <br />
            <input
              type='text'
              placeholder='Please enter your Name!'
              onChange={this.handleChange}
            />
            <input type='submit' />
          </form>
        </div>
      )
    } else {
      return (
        <QuestionHandler studentName={this.state.name}/>
      )
    }
  }



}

export default StudentLogin;