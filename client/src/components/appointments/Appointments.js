import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppointmentsByAppointment from './AppointmentsByAppointment'
import AppointmentsByChild from './AppointmentsByChild'
import Navbar from '../../containers/Navbar'
import Footer from '../../containers/Footer'

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
            appt:{}
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

    handleAppointmentSubmit = (event) => {
        event.preventDefault()

            let reason = event.target.appointment_reason.value ? event.target.appointment_reason.value : event.target.appointment_reason.defaultValue
            let other_reason = event.target.appointment_other_reason.value ? event.target.appointment_other_reason.value : null
            let date_and_time = event.target.appointment_date_and_time.value !== "" ?  event.target.appointment_date_and_time.value :  event.target.appointment_date_and_time.defaultValue
            let location_name = event.target.appointment_location_name.value ?  event.target.appointment_location_name.value :  event.target.appointment_location_name.defaultValue
            let location_address_number = event.target.appointment_location_address_number.value ? event.target.appointment_location_address_number.value : event.target.appointment_location_address_number.defaultValue
            let location_street_name = event.target.appointment_location_street_name.value ? event.target.appointment_location_street_name.value : event.target.appointment_location_street_name.defaultValue
            let location_suburb = event.target.appointment_location_suburb.value ?  event.target.appointment_location_suburb.value :  event.target.appointment_location_suburb.defaultValue
            let location_postcode = event.target.appointment_location_postcode.value ? event.target.appointment_location_postcode.value : event.target.appointment_location_postcode.defaultValue
            let location_city = event.target.appointment_location_city.value ? event.target.appointment_location_city.value : event.target.appointment_location_city.defaultValue
            let location_state = event.target.appointment_location_state.value ? event.target.appointment_location_state.value : event.target.appointment_location_state.defaultValue
            let location_country = event.target.appointment_location_country.value ? event.target.appointment_location_country.value : event.target.appointment_location_country.defaultValue
            let location_contact_number = event.target.appointment_location_contact_number.value ? event.target.appointment_location_contact_number.value : event.target.appointment_location_contact_number.defaultValue
            let visit_age =
                reason === "MCHS Visit"
                ?
                event.target.appointment_visit_age.value
                :
                ""
                console.log(visit_age)
            let child_id = event.target.appointment_child_id.value ? event.target.appointment_child_id.value : event.target.appointment_child_id.defaultValue
            let id = event.target.appointment_id.value ? event.target.appointment_id.value : event.target.appointment_id.defaultValue

            let appointment= {
                reason: other_reason ? other_reason : reason,
                date_and_time: date_and_time,
                location_name: location_name,
                location_address_number: location_address_number,
                location_street_name: location_street_name,
                location_suburb: location_suburb,
                location_postcode: location_postcode,
                location_city: location_city,
                location_state: location_state,
                location_country: location_country,
                location_contact_number: location_contact_number,
                visit_age: visit_age,
                child_id: child_id,
            }
            axios.put(`/api/v1/appointments/${id}`, {appointment}, {withCredentials:true})
            .then(response => {
                console.log(response)
                if (response.data.status === 'updated'){
                    window.location.replace("http://localhost:4000/records")
                } else {
                    this.setState({
                        errors: [...this.state.errors, response.data.errors]
                    })
                }
            })
            .catch( error => console.log('api errors: ', error))
        }

    handleAppointmentEdit = (event) => {
        const id = event.target.id.split("-")[0]
        const inputs = document.getElementsByClassName(id)
        const button = document.getElementById(event.target.id)
        const breaks = document.getElementsByClassName("appointment_breaks")
        if(button.innerHTML !== "Close Editing"){
            for(let i = inputs.length-1; i >= 0; i--){
                inputs[i].style.display = "block"
                breaks[i].classList.add("hidden")
            }
            button.innerHTML = "Close Editing"
        } else {
            for(let i = inputs.length-1; i >= 0; i--){
                inputs[i].style.display = "none"
                breaks[i].style.display = "content"
            }
            button.innerHTML = "Edit Appointment"
        }
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
                    <label>Sort By: <select className="appointment_inputs" name="sortBy" onChange={this.handleSort}>
                        <option value="Appointment">Appointment Date and Time</option>
                        <option value="Children">Children Last Name</option>
                    </select></label>
                    </form >
                    <div className="appointments_form">
                        {this.state.sortBy === "Children" ?
                            <AppointmentsByChild children={this.state.children} handleAppointmentSubmit={this.handleAppointmentSubmit} handleAppointmentEdit={this.handleAppointmentEdit}/>
                            :
                            <AppointmentsByAppointment children={this.state.children} appointments={this.state.appointments} handleAppointmentSubmit={this.handleAppointmentSubmit} handleAppointmentEdit={this.handleAppointmentEdit}/>
                        }
                    </div>
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