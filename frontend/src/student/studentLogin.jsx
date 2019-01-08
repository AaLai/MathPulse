import React from 'react';
import { API_ROOT, HEADERS } from '../secrets';
import QuestionHandler from './questionHandler'

// Creates student on server side and makes sure
// student joins an already existing test
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

  checkIfTestExists = form => {
    form.preventDefault();
    form.target.reset();
    const test = this.state.formField
    fetch(`${API_ROOT}/tests/${test}/`)
      .then (res => {
        if (res.ok) {
          res.json()
          .then( testdata => {
            if (testdata !== null) {
              this.setState({ testID: testdata.id,
                           formField: null
                           });
            } else {
              alert('That test doesn\'t exist, please try again');
            }
          });
        }
      });
  };

  createStudent = form => {
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
        this.setState({     name: this.state.formField,
                       formField: null
                     });
      }
    });
  }


  render = () => {

    const styleObject = { marginLeft: 10};
    if (!this.state.testID) {
      return (
        <div>
          <h3>Please enter the test ID</h3>
          <form onSubmit={this.checkIfTestExists}>
            <input
              className="teacherinputs"
              type='text'
              placeholder='Your teacher should provide this...'
              onChange={this.handleChange}
            />
            <br/>
            <input class="btn btn-info" style={styleObject} type='submit' />
          </form>
        </div>
      );
    } else if (!this.state.name) {
      return (
        <div>
          <h3>Please enter your name</h3>
          <form onSubmit={this.createStudent}>
            <input
              className="teacherinputs"
              type='text'
              placeholder='Please enter your first name...'
              onChange={this.handleChange}
            />
            <br/>
            <input class="btn btn-info" style={styleObject} type='submit' />
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