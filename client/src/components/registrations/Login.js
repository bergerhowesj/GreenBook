import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: []
     };
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
    let user = {
      username: username,
      email: email,
      password: password
    }

    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
      } else {
        console.log(response.data.errors)
        this.setState({
          errors: [...this.state.errors, response.data.errors]
        })
      }
    })
    .catch(error => {
      console.log("API error", error)
      this.setState({
        errors: [...this.state.errors, error]
      })
    })
  };

  redirect = () => {
    window.location.replace('http://localhost:4000/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }

  render() {
    const {username, email, password} = this.state
    return (
        <div className="inner_login_container">
          <h3 className="login_banner banner">Log In</h3>
          <form onSubmit={this.handleSubmit} className="login_form_container">
            <label>Username</label>
            <input
              className="login_inputs"
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            /><br/>
            <label>Email</label><input
              className="login_inputs"
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
              autoComplete='email'
              required
            /><br/>
            <label>Password</label><input
              className="login_inputs"
              placeholder="password"
              type="password"
              name="password"
              autoComplete='current-password'
              value={password}
              onChange={this.handleChange}
              required
            />
            <input type="submit" value="Log In" className="login_button submit"/>
            </form>
            <label className="or">or</label><br/>
              <form action='http://localhost:3001/login' className="button_to" data-remote="true" method="get">
                <input type="submit" className="submit" value="Log in with Google" />
              </form>
            <label className="or">or</label><br/>
              <input type="submit" value="Sign Up" className="signup_link submit" to='/signup'/>
            <div>
              {
                this.state.errors ? this.handleErrors() : null
              }
            </div>
        </div>
    );
  }
}
export default Login;