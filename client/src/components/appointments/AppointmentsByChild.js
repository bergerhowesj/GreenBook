
import Appointment from "./Appointment"

const AppointmentsByChild = ({children, editAppointment, handleEditAppointment, handleAppointmentSubmit, addAppointmentButton}) => {
    return(
        <div>
            {children.map(child => {
                if(child.appointments.length > 0){
                    return(
                        <div key={child.id}>
                            <h5 className="child_names">{child.first_name} {child.last_name}</h5>
                            <div>
                                {child.appointments.map(appointment => {
                                    return(
                                        <Appointment addAppointmentButton={addAppointmentButton} handleEditAppointment={handleEditAppointment} appointment={appointment} editAppointment={editAppointment} handleAppointmentSubmit={handleAppointmentSubmit} getAppointments={this.props.getAppointments}/>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
export default AppointmentsByChild