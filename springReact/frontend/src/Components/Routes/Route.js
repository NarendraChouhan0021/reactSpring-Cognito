import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from '../App/App';
import UserStatus from '../UserStatus/UserStatus';
import history from '../../history'

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/details" component={UserStatus} />
        </Switch>
      </Router>
    );
  }
}
export default Routes