import React, { Component } from 'react';
import NavBar from '../../NavBar/NavBar';
import Login from '../../Auth/LoginForm';
// import axios from 'axios';

class LoginPage extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = event => {
    console.log('hello');
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        <NavBar />
        <Login
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          handleSubmit={this.handleFormSubmit}
        />
      </div>
    );
  }
}

export default LoginPage;
