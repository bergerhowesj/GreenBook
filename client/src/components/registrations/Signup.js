import React, { Component } from 'react';
import {Link } from 'react-router-dom'
import Navbar from '../../containers/Navbar';
import axios from 'axios'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      contact_number: '',
      address_unit_number: '',
      address_street_number: '',
      address_street_name: '',
      address_suburb: '',
      address_city: '',
      address_state: '',
      address_country: '',
      email: '',
      password: '',
      password_confirmation: '',
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
      const {
        username,
        first_name,
        last_name,
        contact_number,
        address_unit_number,
        address_street_number,
        address_street_name,
        address_suburb,
        address_city,
        address_state,
        address_country,
        email,
        password,
        password_confirmation
      } = this.state

      let user = {
        username: username,
        first_name: first_name,
        last_name: last_name,
        contact_number: contact_number,
        address_unit_number: address_unit_number,
        address_street_number: address_street_number,
        address_street_name: address_street_name,
        address_suburb: address_suburb,
        address_city: address_city,
        address_state: address_state,
        address_country: address_country,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
  axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
      .then(response => {
        console.log(response.data.status)
        if (response.data.status === 'created') {
          this.props.handleLogin(response.data)
          window.location.replace("/")
        } else {
          this.setState({
            errors: [...this.state.errors, response.data.errors]
          })
        }
      })
      .catch(error => {
        console.log('API error:', error)
        this.setState({
          errors: [...this.state.errors, error]
        })
      })
    };

  handleErrors = () => {
      return (
        <div>
          <ul>{this.state.errors.map((error) => {
            return <li key={error}>{error}</li>
          })}</ul>
        </div>
      )
    }
  render() {
    return (
      <div className='signup_container'>
        <Link id="home" to="/">Back</Link>
        <h3 className="signup_banner">Sign Up</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Username<input
            type="text"
            name="username"
            required
            onChange={this.handleChange}
          /></label>
          <label>First Name<input
            type="text"
            name="first_name"
            required
            onChange={this.handleChange}
          /></label>
          <label>Last Name<input
            type="text"
            name="last_name"
            required
            onChange={this.handleChange}
          /></label>
          <label>Contact Number<input
            type="text"
            name="contact_number"
            required
            onChange={this.handleChange}
          /></label>
          <label>Unit Number<input
            type="text"
            name="address_unit_number"
            onChange={this.handleChange}
          /></label>
          <label>Street Number<input
            type="text"
            name="address_street_number"
            required
            onChange={this.handleChange}
          /></label>
          <label>Street Name<input
            type="text"
            name="address_street_name"
            required
            onChange={this.handleChange}
          /></label>
          <label>Suburb<input
            type="text"
            name="address_suburb"
            required
            onChange={this.handleChange}
          /></label>
          <label>City<input
            type="text"
            name="address_city"
            required
            onChange={this.handleChange}
          /></label>
          <label>State<input
          type= "text"
          name= "address_state"
          required
          onChange={this.handleChange}
          /></label>
          <label>Country<input
            type="text"
            name="address_country"
            required
            onChange={this.handleChange}
          /></label>
          <label>Email<input
            type="text"
            name="email"
            required
            onChange={this.handleChange}
          /></label>
          <label>Password<input
            type="password"
            name="password"
            required
            onChange={this.handleChange}
          /></label>
          <label>Confirm Password<input
            type="password"
            name="password_confirmation"
            required
            onChange={this.handleChange}
          /><br/></label>
          <input value="Sign Up" placeholder="submit" type="submit"/>
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}
export default Signup