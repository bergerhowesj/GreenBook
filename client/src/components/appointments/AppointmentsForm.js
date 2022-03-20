import axios from 'axios'
import React, { Component } from 'react'


class AppointmentsForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            children: [],
            errors: [],
            notes: [],
            options: ["Choose a reason", "MCHS Visit", "GP", "Paediatrician", "Dentist", "Other"],
            appointment: {
                id: this.props.appointment ? this.props.appointment.id : null,
                reason: this.props.appointment ? this.props.appointment.reason : "",
                date_and_time: this.props.appointment ? this.props.appointment.date_and_time : "",
                location_name: this.props.appointment ? this.props.appointment.location_name : "",
                location_address_number: this.props.appointment ? this.props.appointment.location_address_number : "",
                location_street_name: this.props.appointment ? this.props.appointment.location_street_name : "",
                location_suburb: this.props.appointment ? this.props.appointment.location_suburb : "",
                location_postcode: this.props.appointment ? this.props.appointment.location_postcode : 0,
                location_city: this.props.appointment ? this.props.appointment.location_city : "",
                location_state: this.props.appointment ? this.props.appointment.location_state : "",
                location_country: this.props.appointment ? this.props.appointment.location_country : "",
                location_contact_number: this.props.appointment ? this.props.appointment.location_contact_number : "",
                visit_age: this.props.appointment ? this.props.appointment.visit_age : "",
                child_id: this.props.appointment ? this.props.appointment.child_id : null
            },
            visits: [
                "Select a visit",
                "First Home",
                "Two Week",
                "Four Week",
                "Eight Week",
                "Four Month",
                "Six Month",
                "Twelve Month",
                "Eighteen Month",
                "Two Year",
                "Three and a Half Year"
            ]
        }

    }

    componentDidMount(){
        this.getChildren()
    }

    getChildren = () => {
        axios.get("http://localhost:3001/api/v1/children", {withCredentials: true})
        .then(response => {
            this.setState({
                children: response.data
            })
        })
    }

    setAppointment = (event) => {
        event.preventDefault()
        const {
            id,
            reason,
            date_and_time,
            location_name,
            location_address_number,
            location_street_name,
            location_suburb,
            location_postcode,
            location_city,
            location_state,
            location_country,
            location_contact_number,
            visit_age,
            child_id,
        } = this.state.appointment

        let appointment = {
            id: id,
            reason: reason,
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
            visit_age: reason === "MCHS Visit" ? visit_age : null,
            child_id: child_id
        }

        this.props.editing ?
            axios.put(`http://localhost:3001/api/v1/appointments/${id}`, {appointment}, {withCredentials:true})
            .then(response => {
                console.log(response)
                if (response.data.status === 'updated'){
                    this.setState({
                        notes: [...this.state.notes, response.data.status]
                    })
                    this.props.getAppointments()
                    this.props.addAppointmentButton()
                    this.setState({
                        notes: [...this.state.notes, response.data.status]
                    })

                } else {
                    this.setState({
                        errors: [...this.state.errors, response.data.errors]
                    })
                }
            })
        :
            axios.post("http://localhost:3001/api/v1/appointments", {appointment}, {withCredentials: true})
            .then(response => {
                console.log(response)
                if (response.data.status === 'created'){
                    this.redirect()
                } else {
                    this.setState({
                        errors: [...this.state.errors, response.data.errors]
                    })
                }
            })
    }

    redirect = () => {
        window.location.replace("http://localhost:4000/appointments_to_keep")
    }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            appointment:{
                ...this.state.appointment,
                [name]: value
            }
        })
    }

    handleReasonChange = (event) => {
        const value = event.target.value
        let other = document.getElementById("other_reason_input")
        let mchs = document.querySelectorAll(".mchs_inputs")
        let inputs = document.getElementById("location_inputs_label")

        if (value === "Other"){
            for (let i = 0; i < mchs.length; i++){
                let eachInput = mchs[i]
                eachInput.setAttribute("class", "hidden")
            }
            other.removeAttribute("class", "hidden")
        } else if (value === "MCHS Visit"){
            for (let i = 0; i < mchs.length; i++){
                let eachInput = mchs[i]
                eachInput.removeAttribute("class", "hidden")
            }
            other.setAttribute("class", "hidden")
            this.setState({
                appointment : {
                    ...this.state.appointment,
                    reason: "MCHS Visit",
                    location_name: "MCHS Clinic Elsternwick" ,
                    location_address_number: "274" ,
                    location_street_name: "Glen Eira Road" ,
                    location_suburb: "Elsternwick",
                    location_postcode: 3185,
                    location_city: "Melbourne",
                    location_state: "VIC",
                    location_country: "Australia",
                    location_contact_number: "95281895"
                }
            },()=>{inputs.setAttribute("class", "hidden")})
        } else {
            this.handleChange(event)
        }
    }

    addAnotherReason = (event) => {
        event.preventDefault()
        let button = event.target
        const value = event.target.parentNode.children[0].value
        const name = "reason"
        this.setState({
            appointment: {
                ...this.state.appointment,
                [name]: value
            }
        })
        button.innerHTML = "Added!"
    }

    handleVisitChange = (event) => {
        const name = "visit_age"
        const value = event.target.value
        this.setState({
            appointment:{
                ...this.state.appointment,
                [name]: value
            }
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

    handleNotes = () =>{
        return (
            <div>
                <ul>{this.state.notes.map((note) => {
                    console.log({note})
                    return <li key="{note}">{note}</li>
                })}</ul>
            </div>
        )
    }

    render(){
        return(
            <div className="container">
                <div className="inner_container">
                {this.props.editing ?
                    <div>
                        <h3 className="banner">Edit Appointment</h3>
                        <button onClick={this.props.handleEditAppointment}>Close</button>
                    </div>
                :
                    <div>
                        <h3 className="banner">Add a new appointment</h3>
                    </div>
                }

                <form className="form" onSubmit = {this.setAppointment}>
                    <label>Select child:  <select name="child_id" defaultValue={this.state.appointment.child_id} onChange={this.handleChange} >
                        {this.state.children.map(child => {
                            return <option key={child.id} value={child.id}>{child.first_name} {child.last_name}</option>}
                        )}
                    </select>
                    <br/>
                    </label>
                    <label>Reason: <select name="reason" defaultValue={this.state.appointment.reason} onChange={this.handleReasonChange} className="appointment_inputs">
                        {this.state.options.map(option => {
                            return <option key={option} value={option}>{option}</option>}
                        )}
                    </select>
                    <br/>
                    <label className="mchs_inputs appointment_inputs hidden" >Select which visit:
                        <select defaultValue={this.state.visit_age} onChange={this.handleVisitChange}>
                        {this.state.visits.map(visit=>{
                            return <option key={visit} value={visit}>{visit} Visit</option>
                        })}
                        </select>
                    <br/>
                    </label>
                    <label className="hidden" id="other_reason_input">Input another option:
                        <input type="text" name="other_reason_input"/><button onClick={this.addAnotherReason}>Add</button>
                    </label>
                    </label>
                    <label>Date and Time
                        <input name="date_and_time" type="datetime-local" defaultValue={this.state.date_and_time} onChange={this.handleChange} className="date_input"/>
                    </label>
                    <br/>
                    <br/>
                    <label id="location_inputs_label">Location:<br/>
                        <label>Business Name: <input defaultValue={this.state.location_name} className="appointments_form_inputs location_inputs" name="location_name" type="text" onChange={this.handleChange}/></label><br/>
                        <label>Street Number: <input defaultValue={this.state.location_address_number} className="appointments_form_inputs appointments_form_inputs location_inputs" name="location_address_number" type="text" onChange={this.handleChange}/></label><br/>
                        <label>Street Name: <input defaultValue={this.state.location_street_name} className="appointments_form_inputs appointments_form_inputs location_inputs" name="location_street_name" type="text" onChange={this.handleChange}/></label><br/>
                        <label>Suburb: <input defaultValue={this.state.location_suburb} className="appointments_form_inputs appointments_form_inputs location_inputs" name="location_suburb" type="text" onChange={this.handleChange}/></label><br/>
                        <label>Postcode: <input defaultValue={this.state.location_postcode} className="appointments_form_inputs appointments_form_inputs location_inputs" name="location_postcode" type="text" onChange={this.handleChange}/></label><br/>
                        <label>City: <input defaultValue={this.state.location_city} className="appointments_form_inputs appointments_form_inputs location_inputs" name="location_city" type="text" onChange={this.handleChange}/></label><br/>
                        <label>State: <input defaultValue={this.state.location_state} className="appointments_form_inputs appointments_form_inputs location_inputs" name="location_state" type="text" onChange={this.handleChange}/></label><br/>
                        <label>Country: <input defaultValue={this.state.location_country} className="appointments_form_inputs appointments_form_inputs location_inputs" name="location_country" type="text" onChange={this.handleChange}/></label><br/>
                        <label>Contact Number: <input defaultValue={this.state.location_contact_number} className="appointments_form_inputs appointments_form_inputs location_inputs" name="location_contact_number" type="text" onChange={this.handleChange}/></label><br/>
                    </label>
                    <label><input className="submit" value="Submit" type="submit"/></label>
                </form>
                <div>
                    {
                        this.state.errors ? this.handleErrors() : null
                    }
                    {
                        this.state.notes ? this.handleNotes() : null
                    }
                </div>
                </div>
            </div>
        )
    }
}

export default AppointmentsForm