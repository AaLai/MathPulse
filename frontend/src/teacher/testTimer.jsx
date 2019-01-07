import React, { Component } from 'react';

class TestTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testTime: null,
       seconds: 59,
         pause: false,
      negative: false,
      timeSent: null
      }
  }

// Sets up initial timer state
  componentDidMount = () => {
    this.setState({ testTime: this.props.testTime - 1 });
    const countdown = setInterval(this.timer, 1000);
    this.setState({ countdown: countdown });
  }

// Timer countdown and test end logic
  timer = () => {
    if (this.props.testEnd && !this.state.timeSent) {
      clearInterval(this.state.countdown);
      this.displayTotalTestTime();
    } else if (this.state.negative && this.state.seconds === 59) {
      this.setState({
        testTime: this.state.testTime + 1,
         seconds: 0
      });
    } else if (this.state.testTime === 0 && this.state.seconds === 0) {
      this.setState({
         seconds: 1,
        negative: true
      });
    } else if (!this.state.negative && this.state.seconds === 0) {
      this.setState({
        testTime: this.state.testTime - 1,
         seconds: 59
       });
    } else if (this.state.negative) {
      this.setState({ seconds: this.state.seconds + 1 });
    } else if (!this.state.negative) {
      this.setState({ seconds: this.state.seconds - 1 });
    }
  }

  pause = () => {
    clearInterval(this.state.countdown);
    this.setState({ pause: true });
    this.props.pauseTest('pause');
  }

  continue = () => {
    const countdown = setInterval(this.timer, 1000);
    this.setState({     pause: false,
                    countdown: countdown
                  });
    this.props.pauseTest('continue');
  }

  timerButton = () => {
    if (this.state.pause) {
      return ( <button onClick={this.continue}> Continue Test </button> );
    } else {
      return ( <button onClick={this.pause}> Pause Test </button> );
    }
  }

  displayTotalTestTime = () => {
    let total = 0;
    if (this.state.negative) {
      total = parseInt(this.props.testTime) + parseInt(this.state.testTime);
    } else {
      total = parseInt(this.props.testTime) - parseInt(this.state.testTime);
    }
    this.props.totalTime(total);
    this.setState({ timeSent: true });
  }

// Logic here is used to deal with positive and
// negative minute scenarios and single digit seconds
  render = () => {
    if (this.props.testEnd && this.state.timeSent) {
      return (
        <div>
          Time taken {this.props.totalTestTime} min
        </div>
      )
    } else if (this.state.testTime >= 0 && this.state.seconds < 10 && !this.state.negative) {
      return (
        <div>
          {this.state.testTime}:0{this.state.seconds}
          {this.timerButton()}
        </div>
      )
    } else if (this.state.testTime >= 0 && !this.state.negative) {
      return (
        <div>
          {this.state.testTime}:{this.state.seconds}
          {this.timerButton()}
        </div>
      )
    } else if (this.state.negative && this.state.seconds < 10) {
      return (
        <div style={{color: 'red'}}>
          {this.state.testTime}:0{this.state.seconds}
          {this.timerButton()}
        </div>
      )
    } else if (this.state.negative) {
      return (
        <div style={{color: 'red'}}>
          {this.state.testTime}:{this.state.seconds}
          {this.timerButton()}
        </div>
      )
    }
  }
}

export default TestTimer;