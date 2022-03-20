import React, { Component } from 'react'
import BirthRecord from '../births/BirthRecord'
import BirthsForm from '../births/BirthsForm'


class Child extends Component{
    constructor(){
        super()
        this.state = {
            birthRecord: false,
            birthForm: false,
            birthRecordOpen: false,
            birthFormOpen: false
        }
    }

    showBirthRecord = () => {
        this.setState({
            birthRecord: this.state.birthRecord ? false : true,
            birthRecordOpen: this.state.birthRecordOpen ? false : true
        })
    }

    showBirthForm = () => {
        this.setState({
            birthForm: this.state.birthForm ? false : true,
            birthFormOpen: this.state.birthFormOpen ? false : true
        })

    }
    render(){
    return(
        <div>
            <h4 className="sub_banner">{this.props.child.first_name}</h4>
            {this.props.child.birth ?
            <button onClick={this.showBirthRecord}>{this.state.birthRecordOpen ? "Close" : "Birth Record"}</button> :
            <button onClick={this.showBirthForm}>{this.state.birthFormOpen ? "Close" : "Add a Birth Record"}</button>
           }
           {this.state.birthRecord ? <BirthRecord child={this.props.child}/> : null}
           {this.state.birthForm ? <BirthsForm child={this.props.child}/> : null}
        </div>
    )
}
}
export default Child