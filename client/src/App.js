import React, { Component } from "react";
import "./App.css";
import Home from './components/pages/Home';
import Photos from './components/pages/Photos';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/photos" component={Photos} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
