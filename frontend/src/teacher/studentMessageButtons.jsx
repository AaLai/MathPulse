import React, { Component } from 'react';

// Creates buttons that teacher uses to message students
class StudentMessageButtons extends Component {

  sendMessage = (event) => {
    event.stopPropagation();
    this.props.sendMessage(this.props.student.id, this.props.icon)
  }

  render = () => {

    return (
      <input type="button" value={this.props.icon} onClick={this.sendMessage} />
    )
  }
}

export default StudentMessageButtons;