import React from 'react'
import '../style/index.css'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props){
    super(props)
    this.state={
        
    }
    }

  render(){
    return (
      <div className="navbar">
        {this.props.loggedInStatus ? <Link to="/" onClick={this.props.handleLogout} className="navbar_link">Log out</Link> : <Link to="/signup" onClick={this.props.addBackButton} className="navbar_link">Sign Up</Link> }
        {this.props.backButton ? <Link to="/" className="navbar_link">Home</Link> : null}

        <h2 className='logo'>GreenBook</h2>
      </div>
    );
  }
}

export default Navbar;