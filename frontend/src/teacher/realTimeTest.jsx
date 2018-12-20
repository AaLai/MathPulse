import React, { Component } from 'react';
import { API_WS_ROOT } from '../secrets';
import ActionCable from 'actioncable'

class RealTimeTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: {}
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
        alert(data)
      }
    });
  }

  render = () => {
    return (
      <div>
        <h1> This page is here! </h1>
      </div>
    )
  }


}

export default RealTimeTest;