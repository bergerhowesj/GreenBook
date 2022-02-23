import React from 'react'
import '../style/index.css'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

  render(){
    const loggedIn = this.props.loggedInStatus
    const backButton = this.props.backButton
    const childButton = this.props.childButton

    return (
      <div className="navbar">
        {loggedIn
        ?
          backButton ?
            <div>
              <Link to="/" onClick={this.props.handleLogout} className="navbar_link">Log out</Link>
              <Link to="/" className="navbar_link" onClick={this.props.addBackButton} onClick={this.props.addChildButton}>Home</Link>
            </div>
          :
            <Link to="/" onClick={this.props.handleLogout} className="navbar_link">Log out</Link>
        :
          backButton ?
            <div>
              <Link to="/" className="navbar_link" onClick={this.props.addBackButton} onClick={this.props.addChildButton}>Home</Link>
            </div>
          :
            <Link to="/signup" onClick={this.props.addBackButton} className="navbar_link">Sign Up</Link>
        }
        {childButton ? <Link className="navbar_link" to='/add_a_child' onClick={this.props.addChildButton} onClick={this.props.addBackButton}>Add a new child</Link> : null}
        <h2 className='logo'>GreenBook</h2>
      </div>
    )
  }
}


export default Navbar;