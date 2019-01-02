import React, { Component } from 'react';
import { API_WS_ROOT } from '../secrets';
import ActionCable from 'actioncable';
import StudentsOnlineList from './studentsOnlineList';
import StudentStatsTable from './studentStatsTable';


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
        const student = this.studentFinder(studentId)
//  This is for question answers, not used yet
//  Not fully sure how to build yet either
//  I'm using the length of the data array for identification
        if (data.length === 5) {
          console.log(student)
          if (student !== false) {
            const category = data[1]
            const answer = data[3]
            let studentList = [...this.state.students]
            studentList[student][category].push(answer)
            this.setState({students: studentList})
            console.log(this.state.students)
          }
//  For initial Student Online List
        } else if (data.length === 2) {
          if (!student) {
            const newStudent = {    id: studentId,
                                  name: data[1],
                                   '1': [],
                                   '2': [],
                                   '3': [],
                                   '4': []
                                  };
            let studentList = [...this.state.students, newStudent]
            this.setState({students: studentList})
          }
        }
      },
      startTest: function() {
        this.perform('start_test', {data: "Run away!"})
      }
    });
  }

  studentFinder = (studentID) => {
    const index = this.state.students.findIndex(student => student.id === studentID)
    if (index === -1 ) {
      return false;
    }
    return index;
  }

  startTest = () => {
    this.teacherChannel.startTest();
    this.setState({testStart: "go"})
  }


  render = () => {

    if (this.state.testStart) {
      return (
        <div>
          <h1> And off we go~ </h1>
          <StudentStatsTable students={this.state.students} />
        </div>
      )
    } else {
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


}

export default RealTimeTest;