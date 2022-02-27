import React from "react"

import BirthDetailsPg1 from "./pages/BirthDetailsPg1"
import BirthDetailsPg2 from "./pages/BirthDetailsPg2"
import BirthDetailsPg3 from "./pages/BirthDetailsPg3"

class BirthDetails extends React.Component{
    constructor(){
        super()
        this.state={
            editing: false,
            page: 1
        }
    }

    nextPage = () => {
        this.setState({
            page: this.state.page < 3 ? this.state.page += 1 : this.state.page
        })
    }
    previousPage = () => {
        this.setState({
            page: this.state.page > 1 ? this.state.page -= 1 : this.state.page
        })
    }
    render(){
        const child = this.props.child
        const birth = this.props.birth
        const hospitalName =this.props.hospitalName
//  export const BirthDetails = ({child, birth, hospitals, hospitalName, handleClick, handleChange, handleBirthEditSubmit}) => {
    return(
        <div>
            {this.state.page === 1 ? < BirthDetailsPg1 child={child} birth={birth} hospitalName={hospitalName}/> : null}
            {this.state.page === 2 ? < BirthDetailsPg2 child={child} birth={birth} /> : null}
            {this.state.page === 3 ? < BirthDetailsPg3 child={child} birth={birth} /> : null}
            {this.state.page > 1 ? <button onClick={this.previousPage}> Prev </button> : null}
            {this.state.page < 3 ? <button onClick={this.nextPage}> Next </button> : null}
        </div>
    )
}
}
export default BirthDetails