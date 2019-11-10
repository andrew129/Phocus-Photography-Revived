import React, { Component } from 'react';
import './App.css';
import LoginPage from './components/pages/Login/Login';
import RegisterForm from './components/pages/Register/Register';
import Home from './components/pages/Home/Home';
import Forum from './components/pages/Forum/Forum';
import Pictures from './components/pages/Pictures';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/Register' component={RegisterForm} />
            <Route exact path='/Login' component={LoginPage} />
            <Route exact path='/' component={Home} />
            <Route exact path='/forum' component={Forum} />
            <Route exact path='/pictures' component={Pictures} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
