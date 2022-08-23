

const BirthDetailsPg2 =({birth})=>{
        return(
            <div>
                <p className="birth_details">
                Examined By: {birth.examiner_name}<br/>
                Delivery Method: {birth.delivery_method ? birth.delivery_method : "Not Supplied"}<br/>
                Weight: {birth.weight ? birth.weight : "0"}kg<br/>
                Length: {birth.length ? birth.length : "0"}cm<br/>
                Head Circumference: {birth.head_circumference ? birth.head_circumference : "0"}cm
                </p>
            </div>
        )
    }


export default BirthDetailsPg2