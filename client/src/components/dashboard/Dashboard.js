import React from 'react'
import axios from 'axios'
import DashboardNav from './DashboardNav'
import Navbar from '../../containers/Navbar'
import Footer from '../../containers/Footer'

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state={
            children: []
        }
    }

    componentDidMount(){
        this.getChildren()
    }

    getChildren = () => {
        axios.get('http://localhost:3001/api/v1/children', {
          withCredentials: true,
      })
        .then(response => {
          this.handleChildren(response.data)
        })
    }

    handleChildren = (data) => {
        this.setState({
          children: data
        })
    }
    render(){
        return(
            <div className="inner_container">
                <div>
                    <h3 className="banner">Welcome back, {this.props.user.first_name} </h3>
                    {this.state.children.length === 0 || this.state.children === undefined ? <p>Please start by adding children under the "Children" tab</p> : null}
                    <DashboardNav addChildButton={this.props.addChildButton}/>
                </div>
            </div>
        )
    }
}

export default Dashboard