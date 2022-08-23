
import Appointment from "./Appointment"

const AppointmentsByAppointment = ({appointments, handleAppointmentSubmit, handleEditAppointment, editAppointment, addAppointmentButton, getAppointments}) => {
    return(
        <div className="by_date_container">
            {appointments.map(appointment => {
                return(
                    <div key={appointment.id}>
                        <Appointment addAppointmentButton={addAppointmentButton} appointment={appointment} handleEditAppointment={handleEditAppointment} editAppointment={editAppointment} handleAppointmentSubmit={handleAppointmentSubmit} getAppointments={getAppointments}/>
                    </div>
                )
            })}
        </div>
    )}
export default AppointmentsByAppointment