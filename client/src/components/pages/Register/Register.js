import React, { Component } from 'react';
import NavBar from '../../NavBar/NavBar';
import Register from '../../Auth/Register';
import axios from 'axios';

class RegisterForm extends Component {
  state = {
    first_name: '',
    last_name: '',
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

  handleFormSubmit = event => {
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      date: Date.now()
    };
    axios.post('/auth/signup', data);
  };

  render() {
    return (
      <div>
        <NavBar />
        <Register
          firstName={this.state.first_name}
          lastName={this.state.last_name}
          email={this.state.email}
          password={this.state.password}
          handleChange={this.handleChange}
          handleSubmit={this.handleFormSubmit}
        />
      </div>
    );
  }
}

export default RegisterForm;
