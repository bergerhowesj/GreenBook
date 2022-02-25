import React from "react";
import { ContactNumbers } from "./contactnumbers/ContactNumbers";
import { MCHSClinicsAndHours } from "./mchsclinicsandhours/MCHSClinicsAndHours";
import { Websites } from "./websites/Websites";



class UsefulInformation extends React.Component{
    constructor(){
        super()
        this.state = {
            contactNumbers: false,
            mchsClinics: false,
            websites: false
        }
    }

    handleClick = (event) => {
        let button = event.target.classList[0]
        this.setState({
            [button]: this.state[button] ? false : true
        })
    }

    render(){
        return(
            <div className="container">
                <div className="inner_container">
                <h3 className="useful_info_banner">Useful Information</h3>
                <div className="info_container">
                    <div className="info_individual_containers">
                        <h4 className="contactNumbers info_banners pointer" name="Numbers" onClick={this.handleClick}>Contact Numbers {this.state.contactNumbers ? <div><br/><button className="contactNumbers info_banners pointer" onClick={this.handleClick}>Close</button></div> : null}</h4>
                        {this.state.contactNumbers ?
                            < ContactNumbers />
                        :
                            null
                        }
                    </div>
                    <div className="info_individual_containers">
                        <h4 className="websites info_banners pointer" onClick={this.handleClick}>Websites {this.state.websites ? <div><br/><button className="websites info_banners pointer" onClick={this.handleClick}>Close</button></div> : null}</h4>
                        {this.state.websites ?
                            < Websites />
                        :
                            null
                        }
                    </div>
                    <div className="info_individual_containers">
                        <h4 className="mchsClinics info_banners pointer" onClick={this.handleClick}>MCHS Clinics & Hours {this.state.mchsClinics ? <div><br/><button className="mchsClinics info_banners pointer" onClick={this.handleClick}>Close</button></div> : null}</h4>
                        {this.state.mchsClinics ?
                            < MCHSClinicsAndHours />
                        :
                            null
                        }
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default UsefulInformation