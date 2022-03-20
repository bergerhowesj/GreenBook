import React from 'react'
import '../style/index.css'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

  render(){
    const loggedIn = this.props.loggedInStatus
    const backButton = this.props.backButton
    const childButton = this.props.childButton
    const appointmentButton = this.props.appointmentButton
    const backToAppointmentButton = this.props.backToAppointmentButton
    const growthButton = this.props.growthButton

    return (
      <div className="navbar">
        {loggedIn ? <Link to="/" onClick={this.props.handleLogout} className="navbar_link">Log out</Link> : <Link to="/signup" onClick={this.props.addBackButton} className="navbar_link">Sign Up</Link>}
        {backButton ? <Link to="/" className="navbar_link" onClick={this.props.addBackButton}>Home</Link> : null}
        {childButton ? <Link className="navbar_link" to='/add_a_child' onClick={this.props.addChildButton}>Add a new child</Link> : null}
        {appointmentButton ? <Link className="navbar_link" to='/add_an_appointment' onClick={this.props.addAppointmentButton}>Add a new appointment</Link> : null}
        {backToAppointmentButton ? <Link className="navbar_link" to='/appointments_to_keep' onClick={this.props.addAppointmentButton}>Back</Link> : null}
        {growthButton ? null : null}
        <h2 className='logo'>GreenBook</h2>
      </div>
    )
  }
}


export default Navbar;