import React, { Component } from 'react';
import logo from '../../swirls.png';
import axios from 'axios'
import './style.css'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              email: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>
              <nav className='navbar navbar-expand-lg'>
                <div>
                  {loggedIn ? (
                    <section className="navbar-section">
                      <a href="/" className="btn btn-link text-secondary" onClick={this.logout}>
                      <span className="text-secondary">logout</span></a>
                    </section>
                  ) : (
                        <img className='App-logo' style={{height: 50, width: 52, position: 'relative', right: 13, marginLeft: 5}} src={logo} alt='empty'></img>
                          <a style={{position: 'relative', right: 8}} className='navbar-brand' href='/'>
                            Phocus
                          </a>
                        <button
                          className='navbar-toggler'
                          type='button'
                          data-toggle='collapse'
                          data-target='#navbarNav'
                          aria-controls='navbarNav'
                          aria-expanded='false'
                          aria-label='Toggle navigation'
                        >
                          <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse' id='navbarNav'>
                          <ul className='navbar-nav'>
                            <li style={{position: 'relative', right: 12}} className='nav-item active'>
                              <a className='nav-link' href='/'>
                                Home <span className='sr-only'>(current)</span>
                              </a>
                            </li>
                            <li style={{position: 'relative', right: 12}} className='nav-item active'>
                              <a className='nav-link' href='/pictures'>
                                Pictures
                              </a>
                            </li>
                            <li style={{position: 'relative', right: 12}} className='nav-item active'>
                              <a className='nav-link' href='/forum'>
                                Forum
                              </a>
                            </li>
                            <li
                              style={{ position: 'relative', left: 950 }}
                              className='nav-item active'
                            >
                            <a className='nav-link' href='/login'>
                              Login
                            </a>
                            </li>
                            <li
                              style={{ position: 'relative', left: 950 }}
                              className='nav-item active'
                            >
                            <a className='nav-link' href='/signup'>
                              Register
                            </a>
                            </li>
                          </ul>
                        </div>
                      )}
                </div>
              </nav>
            </div>
        );
    }
}

export default Navbar


