import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/css/index.css';
import TeacherLogin from './teacher/teachLogin';
import StudentLogin from './student/studentLogin';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      role: null
    };
  };

  changeToTeacher = () => {
    this.setState({role: 'teacher'})
  };

  changeToStudent = () => {
    this.setState({role: 'student'})
  }


  render() {
    if (this.state.role === 'teacher') {
      return (
        <div>
          <TeacherLogin />
        </div>
      );
    }
    else if (this.state.role === 'student') {
      return (
        <div>
          <StudentLogin />
        </div>
      )
    }
    else {
      return (
        <div>
          <button type="button" class="btn btn-primary" onClick={this.changeToTeacher}> Teacher </button>
          <br/>
          <br/>
          <button type="button" class="btn btn-primary" onClick={this.changeToStudent}> Student </button>
        </div>
      );
    }
  }
}

export default App;
