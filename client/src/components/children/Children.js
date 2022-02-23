import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Child from './Child'
import Navbar from '../../containers/Navbar'
import Footer from '../../containers/Footer'


class Children extends React.Component {
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
            <div className="container">
                <div className='inner_container'>
                    <h3 className="banner">Children</h3>
                    {this.state.children.length > 0
                    ?
                        this.state.children.map(child => {
                            return (<Child key={child.id} child={child}/>)
                        })
                    :
                        <p>There are currently no children assigned</p>
                    }
                </div>

            </div>
        )
    }
}

export default Children