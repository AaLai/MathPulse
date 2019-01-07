import React, { Component } from 'react';
import { API_WS_ROOT } from '../secrets';
import ActionCable from 'actioncable';
import StudentsOnlineList from './studentsOnlineList';
import TeacherScoreBoard from './teacherScoreBoard';
import TestTimer from './testTimer';


class RealTimeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
       students: [],
      testStart: null,
        testEnd: null,
  totalTestTime: null,
          pause: null
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
// Uses data array length to filter actions
// data length 5 is for answers from the student side
// data length 2 is for creating a new student when they log in
      received: (data) => {
        const studentId = data[0];
        const student = this.studentFinder(studentId)
        if (data.length === 5) {
          if (student !== false) {
            const category = data[1]
            const answer = data[3]
            const level = data[2]
            let studentList = [...this.state.students]
            studentList[student][category][level].push(answer)
            this.setState({students: studentList})
            console.log(this.state.students)
          }
        } else if (data.length === 2) {
          if (!student) {
            if (this.state.pause) {
              this.teacherChannel.pauseTest(studentId, "pause");
            }
            const newStudent = {    id: studentId,
                                  name: data[1],
                                   '1': [ [], [], [], [] ],
                                   '2': [ [], [], [], [] ],
                                   '3': [ [], [], [], [] ],
                                   '4': [ [], [], [], [] ]
                                  };
            let studentList = [...this.state.students, newStudent]
            this.setState({students: studentList})
          }
        }
      },
      startTest: function(studentID) {
        this.perform('start_test', {id: studentID});
      },
      sendMessage: function(studentID, message) {
        this.perform('send_message', {      id: studentID,
                                       message: message
                                     });
      },
      endTest: function(studentID) {
        this.perform('end_test', { id: studentID });
      },
      pauseTest: function(studentID, pause) {
        this.perform('pause_test', {    id: studentID,
                                     pause: pause
                                   });
      }
    });
  }

// checks if a student exists and displays their location in array if they do
  studentFinder = (studentID) => {
    const index = this.state.students.findIndex(student => student.id === studentID)
    if (index === -1 ) {
      return false;
    }
    return index;
  }

  startTest = () => {
    this.state.students.map((student) => {
      this.teacherChannel.startTest(student.id)
    })
    this.setState({testStart: "go"})
  }

  sendMessage = (studentID, message) => {
    this.teacherChannel.sendMessage(studentID, message)
  }

  endTest = () => {
    this.setState({ testEnd: true })
    this.state.students.map((student) => {
      this.teacherChannel.endTest(student.id)
    })
  }

  pauseTest = (pause) => {
    this.state.students.map((student) => {
      this.teacherChannel.pauseTest(student.id, pause)
    })
    this.setState({ pause: pause })
  }

  totalTestTimeSet = (time) => {
    this.setState({ totalTestTime: time })
  }

  render = () => {
    const styleObject = { marginLeft: 10};
    if (this.state.testEnd) {
      return (
        <div>
          <p class="h2 bg-secondary text-white"> Real Time Results... </p>
          <TestTimer
            testTime={this.props.testTime}
            pauseTest={this.pauseTest}
            testEnd={this.state.testEnd}
            totalTime={this.totalTestTimeSet}
            totalTestTime={this.state.totalTestTime}
          />
          <TeacherScoreBoard
            students={this.state.students}
            sendMessage={this.sendMessage}
            testEnd={this.state.testEnd}
          />
        </div>
      )
    } else if (this.state.testStart) {
      return (
        <div>
          <h3> Real Time Results: <span class="badge badge-secondary">{this.props.roomID}</span></h3>
          <TestTimer
            testTime={this.props.testTime}
            pauseTest={this.pauseTest}
            testEnd={this.state.testEnd}
          />
          <TeacherScoreBoard
            students={this.state.students}
            sendMessage={this.sendMessage}
          />
          <button onClick={this.endTest}> End Test </button>
        </div>
      )
    } else {
      return (
        <div>
          <h1> Please write {this.props.roomID} on the board! </h1>
          <h3> Online Students </h3>
          <StudentsOnlineList students={this.state.students} />
          <br/>
          <button class="btn btn-info" style={styleObject} onClick={this.startTest}> Start Test </button>
        </div>
      )
    }
  }


}

export default RealTimeTest;