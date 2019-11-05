import React, {Component} from 'react'; // imports component from react lib
import {Link, withRouter} from 'react-router-dom'; // allows the use of Link tags, withRouter lets us push in states in app

// declare function named logout that accepts a parameter of (e) for event  
class Landing extends Component {
    logOut(e) { 
        e.preventDefault() // prevents default action of object of logout
        localStorage.removeItem('usertoken') // removes token from localStorage
        this.props.history.push('/') // pushes url to '/path' which is Landing component 
    }

    render() {
        const loginRegLink = (
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <Link to='/login' className='nav-link'>
                        Login
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/register' className='nav-link'>
                        Register
                    </Link>
                </li>
            </ul>        
        )

        const userLink = (
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <Link to='/profile' className='nav-link'>
                       User
                    </Link>
                </li>
                <li className='nav-item'>
                    <a href='/' onClick={this.logOut.bind(this)} className='nav-link'>
                       Logout
                    </a>
                </li>
            </ul>        
        )
    
        return(
            <nav className='navbar navbar-extend-lg navbar-dark bg-dark rounded'>
                <button className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbar1'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse justify-content-md-center' id='navbar1'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link to='/' className='nav-link'>
                                Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Landing)