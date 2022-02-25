
import Appointment from "./Appointment"

const AppointmentsByChild = ({children, editAppointment, handleEditAppointment, handleAppointmentSubmit}) => {
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
                                        <Appointment handleEditAppointment={handleEditAppointment} appointment={appointment} editAppointment={editAppointment} handleAppointmentSubmit={handleAppointmentSubmit}/>
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