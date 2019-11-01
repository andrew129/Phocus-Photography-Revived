import React, { Component } from "react";
import "./App.css";
import Home from './components/pages/Home/Home';
import Forum from './components/pages/Forum/Forum';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forum" component={Forum} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
