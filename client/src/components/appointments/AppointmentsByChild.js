
import Appointment from "./Appointment"

const AppointmentsByChild = ({children, editAppointment, handleEditAppointment, handleAppointmentSubmit, addAppointmentButton, getAppointments}) => {
    return(
        <div>
            {children.map(child => {
                if(child.appointments.length > 0){
                    return(
                        <div key={child.id}>
                            <h5 className="sub_banner">{child.first_name} {child.last_name}</h5>
                            <div>
                                {child.appointments.map(appointment => {
                                    return(
                                        <Appointment addAppointmentButton={addAppointmentButton} handleEditAppointment={handleEditAppointment} appointment={appointment} editAppointment={editAppointment} handleAppointmentSubmit={handleAppointmentSubmit} getAppointments={getAppointments}/>
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