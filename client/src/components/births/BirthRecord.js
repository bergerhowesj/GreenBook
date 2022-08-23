import axios from 'axios'
import React, { Component } from 'react'
import BirthDetails from './birthDetails/BirthDetails'

class BirthRecord extends Component{
    constructor(props){
        super(props)
        this.state = {
            errors: [],
            editing: false,
            showDetails: false,
            deliveryDetailsOpen: false,
            hospitals: [],
            hospitalName: "",
            motherFirstName: "",
            motherLastName: "",
            fatherFirstName: "",
            fatherLastName: "",
            birth: {
                id: this.props.child.birth.id,
                birth_day: this.props.child.birth.birth_day,
                birth_month: this.props.child.birth.birth_month,
                birth_year: this.props.child.birth.birth_year,
                home_birth: this.props.child.birth.home_birth,
                examiner_name: this.props.child.birth.examiner_name,
                delivery_method: this.props.child.birth.delivery_method,
                delivery_time: this.props.child.birth.delivery_time,
                severe_jaundice: this.props.child.birth.severe_jaundice,
                weight: this.props.child.birth.weight,
                length: this.props.child.birth.height,
                head_circumference: this.props.child.birth.head_circumference,
                estimated_gestation: this.props.child.birth.estimated_gestation,
                exchange_transfusion_for_jaundice: this.props.child.birth.exchange_transfusion_for_jaundice,
                newborn_bloodspot_screening_test_completed: this.props.child.birth.newborn_bloodspot_screening_test_completed,
                bloodspot_sample_date: this.props.child.birth.bloodspot_sample_date,
                apgar_one_minute: this.props.child.birth.apgar_one_minute,
                apgar_five_minute: this.props.child.birth.apgar_five_minute,
                problems_requiring_treatment: this.props.child.birth.problems_requiring_treatment,
                admission_to_intensive_care_nursery_48hours: this.props.child.birth.admission_to_intensive_care_nursery_48hours,
                intensive_care_reason: this.props.child.birth.intensive_care_reason,
                admission_to_special_care_nursery_48hours: this.props.child.birth.admission_to_special_care_nursery_48hours,
                special_care_reason: this.props.child.birth.special_care_reason,
                child_id: this.props.child.id
            }
        }
    }
    componentDidMount(){
        this.getHospitalName()
        this.getMotherName()
        this.getFatherName()
    }

    getHospitalName = (id) => {
        axios.get('http://localhost:3001/api/v1/hospitals.json', {withCredentials: true})
        .then(response =>
            this.setState({
                hospitals: response.data,
                hospitalName: response.data.find(id => id = this.props.child.birth.hospital_id).name}
        ))
    }

    getMotherName = (id) => {
        axios.get('http://localhost:3001/api/v1/mothers.json', {withCredentials: true})
        .then(response => {
            this.setState({
            motherFirstName: response.data.find(id => id = this.props.child.birth.mother_id).first_name,
            motherLastName: response.data.find(id => id = this.props.child.birth.mother_id).last_name
        })})
    }

    getFatherName = (id) => {
        axios.get('http://localhost:3001/api/v1/fathers.json', {withCredentials: true})
        .then(response =>
            this.setState({
            fatherFirstName: response.data.find(id => id = this.props.child.birth.father_id).first_name,
            fatherLastName: response.data.find(id => id = this.props.child.birth.father_id).last_name
        }))
    }

    showDeliveryDetails = () => {
        this.setState({
            showDetails: this.state.showDetails ? false : true,
            deliveryDetailsOpen: this.state.deliveryDetailsOpen ? false : true
        })
    }

    handleClick = (event) => {
        const value = event.target.id.split("-")[0]
        const inputs = document.getElementsByClassName(value)
        const editButton = document.getElementById(event.target.id)
        const breaks = document.getElementsByClassName("birth_breaks")
        const container = document.getElementById("birth_details_container")
        if(editButton.innerHTML !== "Hide Editing"){
            for(let i = inputs.length-1; i >= 0; i--){
                inputs[i].classList.remove("hidden")
                breaks[i].classList.add("hidden")
                editButton.innerHTML = "Hide Editing"
            }
        } else {
            for(let i = inputs.length-1; i >= 0; i--){
                inputs[i].classList.add("hidden")
                breaks[i].classList.remove("hidden")
                editButton.innerHTML = "Edit Birth Details"
            }
        }

        container.style.textAlign = "center"
    }

    handleChange = (event)=>{
        const name = event.target.name.split("-")
        const form = name[0]
        const key = name[1]
        const value = event.target.value
        this.setState({
            [form]:{
                ...this.state[form],
                [key] : value
            }
        })
    }

    handleBirthEditSubmit = (event) => {
        event.preventDefault()
        let birth_id = event.target.birth_id.value
        const {
            birth_day,
            birth_month,
            birth_year,
            home_birth,
            examiner_name,
            delivery_method,
            delivery_time,
            severe_jaundice,
            weight,
            length,
            head_circumference,
            estimated_gestation,
            exchange_transfusion_for_jaundice,
            newborn_bloodspot_screening_test_completed,
            bloodspot_sample_date,
            apgar_one_minute,
            apgar_five_minute,
            problems_requiring_treatment,
            admission_to_intensive_care_nursery_48hours,
            intensive_care_reason,
            admission_to_special_care_nursery_48hours,
            special_care_reason,
        } = this.state.birth

        let birth = {
            birth_day: birth_day,
            birth_month: birth_month,
            birth_year: birth_year,
            home_birth: home_birth,
            examiner_name: examiner_name,
            delivery_method: delivery_method,
            delivery_time: delivery_time,
            severe_jaundice: severe_jaundice,
            weight: weight,
            length: length,
            head_circumference: head_circumference,
            estimated_gestation: estimated_gestation,
            exchange_transfusion_for_jaundice: exchange_transfusion_for_jaundice,
            newborn_bloodspot_screening_test_completed: newborn_bloodspot_screening_test_completed,
            bloodspot_sample_date: bloodspot_sample_date,
            apgar_one_minute: apgar_one_minute,
            apgar_five_minute: apgar_five_minute,
            problems_requiring_treatment: problems_requiring_treatment,
            admission_to_intensive_care_nursery_48hours: admission_to_intensive_care_nursery_48hours,
            intensive_care_reason: intensive_care_reason,
            admission_to_special_care_nursery_48hours: admission_to_special_care_nursery_48hours,
            special_care_reason: special_care_reason,
        }

        axios.put(`http://localhost:3001/api/v1/births/${birth_id}`, {birth}, {withCredentials:true})
        .then(response => {
            console.log(response)
            if (response.data.status === 'created'){
                window.location.replace("http://localhost:4000/children")
            } else {
                this.setState({
                    errors: [...this.state.errors, response.data.errors]
            })
        }
    })
    .catch( error => console.log('api errors:', error))
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
        const birth = this.props.child.birth
    return(
        <div>
            <div className="baby_details">
                <p>
                Birthday: {birth.birth_day}/{birth.birth_month}/{birth.birth_year}<br/>
                Mother: {this.state.motherFirstName} {this.state.motherLastName}<br/>
                Father: {this.state.fatherFirstName} {this.state.fatherLastName}<br/>
                </p>
                <div className="delivery_details_container">
                    <button className="delivery_details pointer" id={`delivery_details_${this.props.child.id}`} onClick={this.showDeliveryDetails}>{this.state.deliveryDetailsOpen ? "Close" : "Delivery Details"}</button>
                    {this.state.showDetails ? <BirthDetails child={this.props.child} birth={birth} hospitalName={this.state.hospitalName} hospitals={this.state.hospitals} handleClick={this.handleClick} handleChange={this.handleChange} handleBirthEditSubmit={this.handleBirthEditSubmit}/> : null}
                    <div>
                        {
                            this.state.errors ? this.handleErrors() : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
}
export default BirthRecord