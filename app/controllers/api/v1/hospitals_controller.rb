class Api::V1::HospitalsController < Api::V1::BaseController
    before_action :authentication_redirect, :only => [:index, :show]
    before_action :current_user
    before_action :set_hospital, :only => [:show, :edit, :update, :destroy]

    def index
        @hospitals = Hospital.all
        if @hospitals
            render json: {
                hospitals: @hospitals
            }
        else
            render json:{
                status: 500,
                errors: ['no hospitals found']
            }
        end
    end

    def create
        @hospital = Hospital.new(hospital_params)
        if @hospital.save
            render json: {
                status: :created,
                user: @user,
                hospital: @hospital
            }
        else 
            render json: {
                status: 500,
                errors: @user.errors.full_messages
            }
        end
    end

    def update
        if @hospital.update(hospital_params)
            render json: {
                status: :created,
                user: @user,
                hospital: @hospital
            }
        else 
            render json: {
                status: 500,
                errors: @user.errors.full_messages
            }
        end
    end

    def show
    end

    def edit
    end

    def destroy
        @hospital.destroy
    end

  private

    def set_hospital
        @hospital = Hospital.find(params[:id])
      
     def hospital_params
         params.require(:hospital).permit(:name, :address_line_1, :address_line_2, :address_suburb, :address_postcode, :address_state, :address_city, :address_country)
     end
     
  end