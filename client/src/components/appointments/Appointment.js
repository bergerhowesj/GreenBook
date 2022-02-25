import React from 'react'
import AppointmentsForm from "./AppointmentsForm"

class Appointment extends React.Component{
    constructor(){
        super()
        this.state={
            editAppointment: false
        }
    }

    handleEditAppointment = () => {
        this.setState({
            editAppointment: this.state.editAppointment ? false : true
        })
    }

    render(){
        const appointment = this.props.appointment
        const date_and_time = appointment.date_and_time.split("T")
        const time = date_and_time[1].slice(0,5)
        const date_split = date_and_time[0].split("-")
        const day = date_split[2]
        const month = date_split[1]
        const year = date_split[0]
        const appointment_date = `${day}-${month}-${year}`
        
        return(
            <div>
                <p className="appointment_info">
                    <span className="underline">Reason:</span> {appointment.reason} {appointment.visit_age}<br/>
                    <span className="underline">Date:</span> {appointment_date}<br/>
                    <span className="underline">Time:</span> {time}<br/>
                    <span className="underline"><strong>Location:</strong></span><br/>
                    {appointment.location_name}<br/>
                    {appointment.location_address_number} {appointment.location_street_name}<br/>
                    {appointment.location_suburb}<br/>
                    {appointment.location_city} {appointment.location_state} {appointment.location_postcode}<br/>
                    {appointment.location_country}<br/>
                    {appointment.location_contact_number}<br/>
                    <button className="editAppointment" onClick={this.handleEditAppointment}>Edit</button>
                </p>
                {this.state.editAppointment ? <AppointmentsForm handleAppointmentSubmit={this.props.handleAppointmentSubmit} handleEditAppointment={this.handleEditAppointment} appointment={appointment}/> : null}
            </div>
        )
    }
}

export default Appointment