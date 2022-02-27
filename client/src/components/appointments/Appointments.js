import axios from 'axios'
import React, { Component } from 'react'
import AppointmentsByAppointment from './AppointmentsByAppointment'
import AppointmentsByChild from './AppointmentsByChild'


class Appointments extends Component{
    constructor(props){
        super(props)
        this.state = {
            appointments: [],
            children: [],
            sortBy: "Appointment",
            appointment: {
                reason: "",
                date_and_time: "",
                location_name: "",
                location_address_number: "",
                location_street_name: "",
                location_suburb: "",
                location_postcode: 0,
                location_city: "",
                location_state: "",
                location_country: "",
                location_contact_number: "",
                visit_age: "",
                child_id: 0
            },
            editAppointment: false
        }
    }

    componentDidMount(){
        this.getChildren()
        this.getAppointments()
    }


    getChildren = () => {
        axios.get('http://localhost:3001/api/v1/children', {withCredentials:true})
        .then(response => {
            this.setState({
                children: response.data
            })
        })
    }

    getAppointments = () => {
        axios.get('http://localhost:3001/api/v1/appointments', {withCredentials:true})
        .then(response => {
            this.setState({
                appointments: response.data
            })
        })
    }

    handleSort = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }

    handleErrors = () =>{
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
        return(
            <div className="container">
                <div className="inner_container">
                    <h3 className="banner">Important Appointments</h3>
                    <form >
                    <label>Sort By: 
                        <select className="appointment_inputs" name="sortBy" onChange={this.handleSort}>
                            <option value="Appointment">Appointment Date and Time</option>
                            <option value="Children">Children Last Name</option>
                        </select>
                    </label>
                    </form >
                    {!this.state.children.length > 0 ? <p><br/>There are no appointments to display<br/>Please begin by adding a child and birth records</p> :
                        <div className="appointments_form">
                            {
                                this.state.sortBy === "Children" 
                                ?
                                    <AppointmentsByChild children={this.state.children} handleAppointmentSubmit={this.handleAppointmentSubmit} handleEditAppointment={this.handleEditAppointment} editAppointment={this.state.editAppointment} addAppointmentButton={this.props.addAppointmentButton} getAppointments={this.getAppointments}/>
                                :
                                    <AppointmentsByAppointment children={this.state.children} appointments={this.state.appointments} handleAppointmentSubmit={this.handleAppointmentSubmit} handleEditAppointment={this.handleEditAppointment} editAppointment={this.state.editAppointment} addAppointmentButton={this.props.addAppointmentButton} getAppointments={this.getAppointments}/>
                            }
                        </div>
                    }
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

export default Appointments