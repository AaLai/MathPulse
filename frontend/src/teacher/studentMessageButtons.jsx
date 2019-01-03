import React, { Component } from 'react';

class StudentMessageButtons extends Component {

  sendMessage = (num) => {
    this.props.sendMessage(this.props.student.id, this.props.icon)
  }

  render = () => {
    return (
      <input type="button" value={this.props.icon} onClick={this.sendMessage} />
    )
  }
}

export default StudentMessageButtons;