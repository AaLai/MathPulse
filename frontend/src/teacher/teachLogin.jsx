import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class TeacherLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: null,
      user: null
    }
  }

  handleChange = form => {
    this.setState({ user: form.target.value });
  };


  handleSubmit = form => {
    form.preventDefault();
    cookies.set('teach', this.state.user, { path: "/" });
    this.setState({ user: "" });
  };


  render = () => {
    if (!cookies.get('teach')) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>User Name</label>
            <br />
            <input
              type='text'
              placeholder='please enter your name'
              onChange={this.handleChange}
            />
            <input type='submit' />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          I'm a teacher!
        </div>
      )
    }
  }


}

export default TeacherLogin;