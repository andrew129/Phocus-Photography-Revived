import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
    axios
      .post('/user/logout')
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            email: null
          });
        }
      })
      .catch(error => {
        console.log('Logout error');
      });
  }

  render() {
    // const loggedIn = this.props.loggedIn;
    // console.log('navbar render, props: ');
    // console.log(this.props);

    return (
      <div>
        <nav class='mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1'>
          <a class='navbar-brand' href='#'>
            Phocus
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent-555'
            aria-controls='navbarSupportedContent-555'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <div class='collapse navbar-collapse' id='navbarSupportedContent-555'>
            <ul class='navbar-nav mr-auto'>
              <li class='nav-item active'>
                <a class='nav-link' href='/'>
                  Home
                  <span class='sr-only'>(current)</span>
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/pictures'>
                  Pictures
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/forum'>
                  Forums
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/logout'>
                  Sign Out
                </a>
              </li>
            </ul>
            <ul class='navbar-nav ml-auto nav-flex-icons'>
              <li class='nav-item avatar'>
                <a class='nav-link p-0' href='#'>
                  <img
                    src='https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg'
                    class='rounded-circle z-depth-0'
                    alt='avatar image'
                    height='35'
                  ></img>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
