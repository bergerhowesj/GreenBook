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
            <div className="container useful_image">
                <div className="inner_container">
                <h3 className="useful_info_banner">Useful Information</h3>
                <div className="info_container">
                        <button className="contactNumbers info_banners pointer useful_links" name="Numbers" onClick={this.handleClick}>Contact Numbers</button><br/>
                        {this.state.contactNumbers ?
                        <div>
                            <div>
                                <button className="contactNumbers info_banners pointer" onClick={this.handleClick}>Close</button>
                            </div>
                            < ContactNumbers />
                        </div>
                        :
                            null
                        }
                        <button className="websites info_banners pointer useful_links" onClick={this.handleClick}>Websites</button><br/>
                        {this.state.websites ?
                        <div>
                            <div>
                                <button className="websites info_banners pointer" onClick={this.handleClick}>Close</button>
                            </div>
                            < Websites />
                        </div>
                        :
                            null
                        }
                        <button className="mchsClinics info_banners pointer useful_links" onClick={this.handleClick}>MCHS Clinics & Hours</button>
                        {this.state.mchsClinics ?
                        <div>
                            <div>
                                <button className="mchsClinics info_banners pointer" onClick={this.handleClick}>Close</button>
                            </div>
                            < MCHSClinicsAndHours />
                        </div>
                        :
                            null
                        }
                </div>
                </div>
            </div>
        )
    }
}

export default UsefulInformation