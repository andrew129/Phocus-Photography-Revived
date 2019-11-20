// original //
import React, { Component } from 'react'; //
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import axios from 'axios'
// import CommentForm from "../src/components/pages/CommentForm"; // add /CommentForm
import Forum from "../src/components/pages/Forum/Forum"; // add /Forum
import HomePage from "../src/components/pages/HomePage/HomePage"; // add /Homepage
import Pictures from "../src/components/pages/Pictures/";
import NavBar from '../src/components/NavBar/NavBar';
import LoginForm from '../src/components/LoginForm';
import SignUpForm from '../src/components/SignUp';
 

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      first_name: ''
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log(response)
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          first_name: response.data.user.first_name
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          first_name: ''
        })
      }
    })
  }

  render() {
    console.log(this.state.first_name)
    return (
      <Router>
      <div className="App">
        <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={HomePage} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <SignUpForm/>}
        />
        <Route exact path="/forum" component={Forum} />
        <Route exact path="/pictures" component={Pictures} /> 
      </div>
      </Router>
    );
  }
}

export default App;
