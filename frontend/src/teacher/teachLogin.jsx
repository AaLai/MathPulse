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
    const rand = this.getRandomString().toUpperCase();
    this.setState({roomID: rand});
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
        this.setState({isReady: true});
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
        this.getTeacherId();
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

    const styleObject = { marginLeft: 10};
    if (!this.state.hasName) {
      return (
        <div>
          <form onSubmit={this.createTeacherName}>
            <label>Please enter your name:</label>
            <br/>
            <input
              className="teacherinputs"
              type='text'
              placeholder='eg. Ms. Kindergan'
              onChange={this.handleNameChange}
            />
            <br/>
            <input class="btn btn-info" style={styleObject} type='submit' />
          </form>
        </div>
      );
    } else if (!this.state.isReady) {
      return (
        <div>
        <h3> In minutes, how long would you like to run this test? </h3>
        <p>(you can pause and end the test at any time)</p>
        <input className="teacherinputs" type="number" placeholder='enter a number like 30, 45 or 90' onChange={this.handleTestTimeSet}/>
        <br></br>

        <button class="btn btn-info" style={styleObject} onClick={this.createTest}> Create Test </button>
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