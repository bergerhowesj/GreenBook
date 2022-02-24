import React from 'react'
import { Link } from 'react-router-dom'

class DashboardNav extends React.Component {
    
    render(){
        return(
            <div className="dashboard_nav">
                <Link onClick={this.props.addChildButton} className="links" to='/children'>Children</Link><br/><br/>
                <Link onClick={this.props.addAppointmentButton} className="links" to='/appointments_to_keep'>Appointments To Keep</Link><br/><br/>
                <Link className="links" to='/records'>Growth and Health Records</Link><br/><br/>
                <Link className="links" to='/useful_information'>Useful Information</Link><br/><br/>
            </div>
        )
    }
}

export default DashboardNav