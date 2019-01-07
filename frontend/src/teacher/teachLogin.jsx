import React from 'react';
import { API_ROOT, HEADERS } from '../secrets';
import RealTimeTest from './realTimeTest'

// Handles teacher and test creation logic
class TeacherLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: null,
      name: null,
      teacher_id: null,
      hasName: null,
      testTime: null,
      isReady: null
    }
  }

  componentDidMount = () => {
    const rand = this.getRandomString();
    this.setState({roomID: rand})
  }

  getRandomString = () => {
    var result = '';
    while (!result || result.length > 7 || result.length < 4)
      result = Math.random().toString(36).substring(7);
    return result;
  }

  handleNameChange = form => {
    this.setState({ name: form.target.value });
  }

  handleTestTimeSet = form => {
    this.setState({ testTime: form.target.value });
  }

  createTest = form => {
    form.preventDefault();
    fetch(`${API_ROOT}/tests`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        name: this.state.roomID,
        teacher_id: this.state.teacher_id
      })
    }).then( resp => {
      if (resp.ok) {
        this.setState({isReady: true})
      }
    });
  }

  createTeacherName = form => {
    form.preventDefault();
    fetch(`${API_ROOT}/teachers`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    })
    .then( resp => {
      if (resp.ok) {
        this.getTeacherId()
      }
    });
  };

  getTeacherId = () => {
    fetch(`${API_ROOT}/teachers/${this.state.name}/`)
      .then(res => res.json())
      .then(teacherInfo => this.setState({teacher_id: teacherInfo.id,
                                             hasName: true }));
  };


  render = () => {
    if (!this.state.hasName) {
      return (
        <div>
          <form onSubmit={this.createTeacherName}>
            <label>User Name</label>
            <br />
            <input
              type='text'
              placeholder='please enter your name'
              onChange={this.handleNameChange}
            />
            <input type='submit' />
          </form>
        </div>
      );
    } else if (!this.state.isReady) {
      return (
        <div>
        <h1> Please enter test duration in minutes </h1>
        <input type="number" onChange={this.handleTestTimeSet}/>
        <br/>
        <button onClick={this.createTest}> Create Test </button>
        </div>
      )
    } else if (this.state.isReady) {
      return (
        <RealTimeTest
          roomID={this.state.roomID}
          testTime={this.state.testTime}
        />
      )
    }
  }


}

export default TeacherLogin;