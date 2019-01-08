import React, { Component } from 'react';

// handles logic and display for test timer along with
// final test time calculation
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

  displayTotalTestTime = () => {
    let total = 0;
    if (this.state.negative) {
      total = parseInt(this.props.testTime) + parseInt(this.state.testTime);
    } else {
      total = parseInt(this.props.testTime) - parseInt(this.state.testTime);
    }
    this.props.totalTime(total);
    clearInterval(this.state.countdown);
    this.setState({ timeSent: true });
  }


// functional component pause button
  TimerButton = (props) => {
    if (this.props.testEnd) {
      return null;
    } else if (this.state.pause) {
      return ( <button class="btn btn-info" onClick={this.continue}> Continue Test </button> );
    } else {
      return ( <button class="btn btn-info" onClick={this.pause}> Pause Test </button> );
    }
  }


// Logic here is used to deal with positive and
// negative minute scenarios and single digit seconds
  render = () => {
    const styleObject = {float: 'right', marginRight: 10, marginTop: 5};
    const styleObjectRed = {float: 'right', marginRight: 10, marginTop: 5, color: 'red'};

    if (this.props.testEnd && this.state.timeSent) {
      return (
        <div>
          Time taken {this.props.totalTestTime} min
        </div>
      )
    } else if (this.state.testTime >= 0 && this.state.seconds < 10 && !this.state.negative) {
      return (
        <div style={styleObject}>
          {this.state.testTime}:0{this.state.seconds}
          <this.TimerButton />
        </div>
      )
    } else if (this.state.testTime >= 0 && !this.state.negative) {
      return (
        <div style={styleObject}>
          {this.state.testTime}:{this.state.seconds}
          <this.TimerButton />
        </div>
      )
    } else if (this.state.negative && this.state.seconds < 10) {
      return (
        <div style={styleObjectRed}>
          <p style={{ display: 'inline-block', marginRight: 3 }}>Extra Time: </p>{this.state.testTime}:0{this.state.seconds}
          <this.TimerButton />
        </div>
      )
    } else if (this.state.negative) {
      return (
        <div style={styleObjectRed}>
          <p style={{ display: 'inline-block', marginRight: 3 }}>Extra Time: </p>{this.state.testTime}:{this.state.seconds}
          <this.TimerButton />
        </div>
      )
    }
  }
}

export default TestTimer;