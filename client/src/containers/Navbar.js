import React from 'react'
import '../style/index.css'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

  render() {
    return (
      <div className="navbar">
        {this.props.loggedInStatus ? <Link to="/" onClick={this.props.handleLogout} className="navbar_link">Log out</Link> : <Link to="/signup" className="navbar_link">Sign Up</Link> }
        <h2 className='logo'>GreenBook</h2>
      </div>
    );
  }
}

export default Navbar;