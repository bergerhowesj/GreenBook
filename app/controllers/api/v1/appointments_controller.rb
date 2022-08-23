class Api::V1::AppointmentsController < Api::V1::BaseController
    before_action :authentication_redirect, :only => [:index, :show]
    before_action :current_user
    before_action :set_appointment, :only => [:show, :edit, :update, :destroy]

    def index
        @appointments = current_user.appointments.all.order(:date_and_time, :child_id)
        if @appointments
            render json: @appointments.to_json(include: {
                child: {}
            })
        else
            render json:{
                status: 500,
                errors: ['no appointments found']
            }
        end
    end

    def create
        @appointment = current_user.appointments.new(appointment_params)
        @appointment.save
        if @appointment.save
            render json: {
                status: :created,
            }
        else
            render json: {
                status: 500,
                errors: @appointment.errors.full_messages
            }
        end
    end

    def update
        if @appointment.update!(appointment_params)
            render json: {
                status: :updated
            }
        else
            render json: {
                status: 500,
                errors: @appointment.errors.full_messages
            }
        end
    end

    def destroy
        @appointment.destroy
    end

  private

    def set_appointment
        @appointment = current_user.appointments.find(params[:id])
    end

    def appointment_params
        params.require(:appointment).permit(:id, :reason, :date_and_time, :location_name, :location_address_number, :location_street_name, :location_suburb, :location_city, :location_state, :location_country, :location_postcode, :location_contact_number, :visit_age, :child_id)
    end

  end