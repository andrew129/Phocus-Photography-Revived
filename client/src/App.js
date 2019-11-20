import React, { Component } from 'react';
import axios from 'axios';
import { Route} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// components
import Signup from './components/pages/Signup/sign-up';
import LoginForm from './components/pages/LoginForm/Login-Form';
import Navbar from './components/NavBar/NavBar';
import Home from './components/pages/HomePage/HomePage';
import Forum from './components/pages/Forum/Forum';
import Pictures from './components/pages/Pictures';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn && <p>Join the party, {this.state.username}!</p>}
          {/* Routes to different components */}
          <Route exact path='/' component={Home} />
          <Route exact path='/pictures' component={Pictures} />
          <Route exact path='/forum' component={Forum} />
          <Route
            path='/login'
            render={() => <LoginForm updateUser={this.updateUser} />}
          />
          <Route path='/signup' render={() => <Signup />} />
        </div>
      </Router>
    );
  }
}

export default App;
