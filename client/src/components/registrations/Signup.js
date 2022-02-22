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
      <div className='container'>
        <div className="inner_container">
        <h3 className="signup_banner">Sign Up</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Username</label><input
            type="text"
            name="username"
            required
            onChange={this.handleChange}
          /><br/>
          <label>First Name</label><input
            type="text"
            name="first_name"
            required
            onChange={this.handleChange}
          /><br/>
          <label>Last Name</label><input
            type="text"
            name="last_name"
            required
            onChange={this.handleChange}
          /><br/>
          <label>Contact Number</label><input
            type="text"
            name="contact_number"
            required
            onChange={this.handleChange}
          /><br/>
          <label>Unit Number</label><input
            type="text"
            name="address_unit_number"
            onChange={this.handleChange}
          /><br/>
          <label>Street Number</label><input
            type="text"
            name="address_street_number"
            required
            onChange={this.handleChange}
          /><br/>
          <label>Street Name</label><input
            type="text"
            name="address_street_name"
            required
            onChange={this.handleChange}
          /><br/>
          <label>Suburb</label><input
            type="text"
            name="address_suburb"
            required
            onChange={this.handleChange}
          /><br/>
          <label>City</label><input
            type="text"
            name="address_city"
            required
            onChange={this.handleChange}
          /><br/>
          <label>State</label><input
          type= "text"
          name= "address_state"
          required
          onChange={this.handleChange}
          /><br/>
          <label>Country</label><input
            type="text"
            name="address_country"
            required
            onChange={this.handleChange}
          /><br/>
          <label>Email</label><input
            type="text"
            name="email"
            required
            onChange={this.handleChange}
          /><br/>
          <label>Password</label><input
            type="password"
            name="password"
            required
            onChange={this.handleChange}
          /><br/>
          <label>Confirm Password</label><input
            type="password"
            name="password_confirmation"
            required
            onChange={this.handleChange}
          /><br/>
          <input value="Sign Up" placeholder="submit" type="submit" className="submit"/>
        </form>
        <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
        </div>
      </div>
    );
  }
}
export default Signup