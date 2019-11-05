import React, { Component } from 'react';
import { register } from './UserFunctions'; // import register method from UserFunction

class Register extends Component {
  // extends to the component
  constructor() {
    super();
    this.state = {
      // declaring initial states of null
      fist_name: '',
      last_name: '',
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this); // binds on Change
    this.onSubmit = this.onSubmit.bind(this); // binds on Submit
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }); // set state to the target name and assigns it
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name, // payload passed
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    register(newUser).then(res => {
      // newUser will be passed to register function
      this.props.history.push('login');
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mt-5 mx-auto'>
            <form noValidate onSubmit='this.onSubmit'>
              <h1 className='h3 mb-3 font-weight-normal'> Please sign in</h1>
              <div className='form-group'>
                <label htmlFor='name'> First Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='first_name'
                  placeholder='Enter First Name'
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='name'> Last Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='last_name'
                  placeholder='Enter Last Name'
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'> Email Address</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  placeholder='Enter Email'
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'> Password</label>
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  placeholder='Enter Password'
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type='submit'
                className='btn btn-lg btn-primary btn-block'
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
