import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Signup from "./pages/Signup";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#E33E7F'
    },
    primary: {
      main: '#1976d2'
    }
  }
});

class App extends React.Component {


  render() {
    return (

      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/dashboard" component={Dashboard} exact />
            <Route path="/dashboard/account/:id" component={Account}/> 
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App;
