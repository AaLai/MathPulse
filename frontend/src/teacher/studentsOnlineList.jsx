import React, { Component } from 'react';

class StudentsOnlineList extends Component {

  render = () => {

    const studentsOnline = this.props.students.map((student) =>
      <li class="list-group-item list-group-item-success">{student.name}</li>
    );

    if (this.props.students.length === 0) {
      return 'Waiting for students';
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