import React, { Component } from 'react';

// Displays students as they log into the test websocket
class StudentsOnlineList extends Component {

  render = () => {

    const studentsOnline = this.props.students.map((student) =>
      <li class="list-group-item list-group-item-success">{student.name}</li>
    );

    if (this.props.students.length === 0) {
      return (
        <p>Students will appear <b><u>here</u></b> automatically as they sign in...</p>
        )
    } else {
      return (
        <ul class="list-group">
          {studentsOnline}
        </ul>
      )
    };
  }
}

export default StudentsOnlineList;