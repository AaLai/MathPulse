import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class StudentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testID: null,
      roomID: null,
      user: null
    }
  }

  handleChange = form => {
    this.setState({ user: form.target.value });
  };


  handleSubmitTestID = form => {
    form.preventDefault();
    const test = form.target.value
    this.setState({ testID: test });
  };

  handleSubmitUser = form => {
    form.preventDefault();
    cookies.set('student', this.state.user, { path: '/' });
  }


  render = () => {
    if (!this.state.roomID) {
      return (
        <div>
          <form onSubmit={this.handleSubmitTestID}>
            <label>User Name</label>
            <br />
            <input
              type='text'
              placeholder='please enter your testID!'
            />
            <input type='submit' />
          </form>
        </div>
      );
    } else if (this.state.roomID && !cookies.get('student')) {
      return (
        <div>
          <form onSubmit={this.handleSubmitUser}>
            <label>User Name</label>
            <br />
            <input
              type='text'
              placeholder='please enter your testID!'
              onChange={this.handleChange}
            />
            <input type='submit' />
          </form>
        </div>
      )
    } else if (this.state.roomID && cookies.get('student')) {
      return (
        <div>
          You've signed in!
        </div>
      )
    }
  }



}

export default StudentLogin;