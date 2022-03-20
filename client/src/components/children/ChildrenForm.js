import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../containers/Navbar';
import Footer from '../../containers/Footer';

class ChildrenForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            middle_name: '',
            last_name: '',
            user_id: this.props.user.id,
            errors: []
        }
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
            first_name,
            middle_name,
            last_name,
            user_id
        } = this.state

        let child = {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            user_id: user_id
        }

        axios.post('http://localhost:3001/api/v1/children.json', {child}, {withCredentials: true})
        .then(response => {
            if (response.data.status === 'created') {
                console.log(response.data)
                console.log("Child created")
                this.props.handleCreateChildren(response.data)
                this.redirect()
            } else {
                this.state.errors.push(response.data.errors)
                }
            })

        .catch(error => console.log('api errors: ', error))
    }

    redirect = () => {
        window.location.replace("http://localhost:4000/children")
    }

    handleErrors = () => {
        return (
            <div>
                <ul>{this.state.errors.map((error) => {
                    console.log({error})
                    return <li key="{error}">{error}</li>
                })}</ul>
            </div>
        )
    }

    render(){
        const {
            first_name,
            middle_name,
            last_name,
        } = this.state

        return(
            <div className="container">
                <div class="inner_container">
                    <h3 className="banner">Add a child</h3>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <label>First Name<input
                            type="text"
                            name="first_name"
                            value={first_name||""}
                            required
                            onChange={this.handleChange}
                        /></label><br/>
                        <label>Middle Name<input
                            type="text"
                            name="middle_name"
                            value={middle_name||""}
                            required
                            onChange={this.handleChange}
                        /></label><br/>
                        <label>Last Name<input
                            type="text"
                            name="last_name"
                            value={last_name||""}
                            required
                            onChange={this.handleChange}
                        /><br/></label><br/>
                        <input className="submit" placeholder="submit" value="Submit" type="submit"/>
                    </form>
                    <div>
                        {
                            this.state.errors ? this.handleErrors() : null
                        }
                    </div>
                </div>
            </div>
        )

    }
}

export default ChildrenForm