import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://zero1.sg/img/accountlogin-icon.png" className="App-logo" alt="logo" />
          <div className="mt-20">

            <a
              className="App-link"
              href="https://auth-client.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=5f44ic3nikn0eo1aune57eg3lk&redirect_uri=http://localhost:8080/details&state=STATE"
              rel="noopener noreferrer">Sign In/Sign Up
            </a>

          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(App);
