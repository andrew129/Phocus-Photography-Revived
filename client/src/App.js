// original //
import React, { Component } from 'react'; //
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom"; //

// import CommentForm from "../src/components/pages/CommentForm"; // add /CommentForm
import Forum from "../src/components/pages/Forum/Forum"; // add /Forum
import HomePage from "../src/components/pages/HomePage/HomePage"; // add /Homepage
import Pictures from "../src/components/pages/Pictures/"; // add /Pictures
// original //

import "../src/components/NavBar/NavBar"

import LoginPage from './containers/LoginPage.jsx';
// import LogoutFunction from './containers/LogoutFunction.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Auth from './utils/Auth';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// remove tap delay, essential for MaterialUI to work properly
// injectTapEventPlugin();



// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     Auth.isUserAuthenticated() ? (
//       <Component {...props} {...rest} />
//     ) : (
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}
//       />
//     )
//   )}/>
// )

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)


// const App = () => (
//    <Router>
//           <div>
//             <Switch>
//               <Route exact path='/' component={Home} />
//               <Route exact path='/forum' component={Forum} />
//               <Route exact path='/pictures' component={Pictures} />
//             </Switch>
//           </div>
//       </Router>
// )


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      userId: null
    }

  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()

  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated(),
    userId: Auth.getUserId() })

  }

  handleSmoothScrollContact = (event) => {
    event.preventDefault ()
   var element = document.getElementById("contact");
   element.scrollIntoView({behavior: "smooth"});
  }

  handleSmoothScrollServices = (event) => {
    event.preventDefault ()
   var element = document.getElementById("services");
   element.scrollIntoView({behavior: "smooth"});
  }

  handleSmoothScrollAbout = (event) => {
    event.preventDefault ()
   var element = document.getElementById("about");
   element.scrollIntoView({behavior: "smooth"});
  }

  // User Login/Register

  

  render() {
    return (
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>   
        <div>
        <nav className='navbar navbar-expand-lg'>
      <a className='navbar-brand' href='/'>
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
          <li className='nav-item active'>
            <a className='nav-link' href='/'>
              Home <span className='sr-only'>(current)</span>
            </a>
          </li>
          <li className='nav-item active'>
            <a className='nav-link' href='/pictures'>
              Pictures
            </a>
          </li>
          <li className='nav-item active'>
            <a className='nav-link' href='/forum'>
              Forum
            </a>
          </li>
          <li
            style={{ position: 'relative', left: 1100 }}
            className='nav-item active'
          >
            <a className='nav-link' href='/login'>
              Login
            </a>
          </li>
          <li
            style={{ position: 'relative', left: 1100 }}
            className='nav-item active'
          >
            <a className='nav-link' href='/signup'>
              Register
            </a>
          </li>
        </ul>
      </div>
    </nav>

            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            {/* <Route path="/logout" component={LogoutFunction}/> */}
            {/* <PrivateRoute path="/commentform" component={CommentForm}/> */}
     

            {/* <Route exact path="/" component={HomePage} />*/}

            <Route exact path="/forum" component={Forum} />
            <Route exact path="/pictures" component={Pictures} /> 
            
           </div>
      
        </Router> 
      </MuiThemeProvider>
    </div> 
             

    );
  }
}

export default App;