import React, { Component } from 'react'
import * as AWS from 'aws-sdk'
import axios from 'axios'
AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1_0zlmiaFyH'
  })
});

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
class UserStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
    }
  }

  componentDidMount() {
    var url = window.location.href;
    let accesToken;
    try {
      accesToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
      if (accesToken)
        this.getValue(accesToken)

    } catch (err) {
      accesToken = url.match(/\&(?:access_token)\=([\S\s]*?)\&/)[1];
      if (accesToken)
        this.getValue(accesToken)
    }
  }

  getValue = (accesToken) => {
    let params = { AccessToken: accesToken };

    cognitoidentityserviceprovider.getUser(params, (err, attributes) => {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        attributes = attributes.UserAttributes
        console.log("attributes.............", attributes)
        for (let i = 0; i < attributes.length; i++) {
          if (attributes[i].Name === 'email') {
            this.setState({ email: attributes[i].Value })
          }
          if (attributes[i].Name === "custom:role") {
            this.setState({ role: attributes[i].Value })
          } else {
            this.setState({ role: "User" })
          }
        }
      }
    });
  }

  springApi = () => {
    fetch('/api/hello')
      .then(response => response.text())
      .then((message) => {
        this.setState({ message: message });
      });
    // let url = "http://localhost:8080"
    // axios.get(url + '/api/hello')
    //   .then((response) => {
    //     console.log(response, "response");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }


  signOut = () => {
    this.setState({ email: '', message: '', role: '' })
    this.props.history.push("/")
  }

  render() {
    return (
      <div className="mt-20">
        <div className="container">
        <div className="form-group">
          <span><b>UserName:</b>{this.state.email}</span>
        </div>
        <div className="form-group">
          <span><b>Role:</b>{this.state.role}</span>
        </div>
        
        <div className="form-group">
          <span><b>Message:</b>{this.state.message}</span>
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={this.springApi}>Call To SpringBoot server</button><br />
          {this.state.email && <button className="btn btn-success" onClick={this.signOut}>Sign out</button>}
        </div>
        
        </div>
      </div>
    )
  }
}

export default UserStatus
