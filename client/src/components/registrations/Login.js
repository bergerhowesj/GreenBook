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
          <h3 className="login_banner">Log In</h3>
          <form onSubmit={this.handleSubmit} className="login_form_container">
            <label>Username <input
              className="login_inputs"
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            /></label>
            <label>Email<input
              className="login_inputs"
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
              autoComplete='email'
              required
            /></label>
            <label>Password<input
              className="login_inputs"
              placeholder="password"
              type="password"
              name="password"
              autoComplete='current-password'
              value={password}
              onChange={this.handleChange}
              required
            /><br/></label>
            <label></label><input type="submit" value="Log In" className="login_button"/>
            </form>
            <p>
              or
            </p>
              <form action='http://localhost:3001/login' className="button_to" data-remote="true" method="get">
                <input type="submit" value="Log in with Google" />
              </form>
            <p>
              or<br/>
              <Link className="signup_link" to='/signup'>Sign up</Link>
            </p>
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