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
            <div>
                <div className='children_container'>
                    <Link to="/" className="children_links">Back to Dashboard</Link> <Link className="children_links" to='/add_a_child'>Add a new child</Link>
                    <h3 className="children_title">Children</h3>
                    {this.state.children.map(child => {
                        return (<Child key={child.id} child={child}/>)
                    })}
                </div>

            </div>
        )
    }
}

export default Children