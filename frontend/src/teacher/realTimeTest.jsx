import React, { Component } from 'react';
import { API_WS_ROOT } from '../secrets';
import ActionCable from 'actioncable';
import StudentsOnlineList from './studentsOnlineList';


class RealTimeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      testStart: null
    }
  }

  componentDidMount = () => {
    this.createSocket();
  }

  createSocket() {
    let cable = ActionCable.createConsumer(`${API_WS_ROOT}/cable`);

    this.teacherChannel = cable.subscriptions.create ({
      channel: 'TeachersChannel'
    }, {
      connected: () => {},
      received: (data) => {
        console.log(data)
        const studentId = data[0];
//  This is for question answers, not used yet
//  Not fully sure how to build yet either
//  I'm using the length of the data array for identification
        if (data.length === 5) {
          if (this.studentExists(this.state.students, studentId)) {
            const dataOrganizer = { category: data[1],
                                       level: data[2],
                                 correct_ans: data[3],
                                   wrong_ans: data[4]
                                  }
            let studentList = [...this.state.students, dataOrganizer]
            this.setState({students: studentList})
          }
//  For initial Student Online List
//  the {[]} in dataOrganizer lets me use studentId as a variable
// as opposed to string
        } else if (data.length === 2) {
          if (!this.studentExists(this.state.students, studentId)) {
            const dataOrganizer = { [studentId]: { name: data[1] } };
            let studentList = [...this.state.students, dataOrganizer]
            this.setState({students: studentList})
          }
        }
      },
      startTest: function() {
        this.perform('start_test', {data: "Run away!"})
      }
    });
  }

  studentExists = (students, studentID) => {
    let exists = false;
    students.map((student) => {
      if (student[studentID]) {
        exists = true;
      }
    })
    return exists;
  }

  startTest = () => {
    this.teacherChannel.startTest();
  }


  render = () => {
    return (
      <div>
        <h1> Please write {this.props.roomID} on the board! </h1>
        <h3> Online Students </h3>
        <StudentsOnlineList students={this.state.students} />
        <button onClick={this.startTest}> Start Test </button>
      </div>
    )
  }


}

export default RealTimeTest;