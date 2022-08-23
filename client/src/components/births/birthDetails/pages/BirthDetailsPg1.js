

const BirthDetailsPg1 = ({child, birth, hospitalName}) => {
    return(
        <div>
            <p className = "birth_details">
                Full Name: {child.first_name} {child.middle_name} {child.last_name}<br/>
                Location: {birth.home_birth ? "Home Birth" : hospitalName}<br/>
                Delivery Time: {new Date(birth.delivery_time).toString().split(" ")[4].slice(0,5)}<br/>
            </p>
        </div>
    )
}

export default BirthDetailsPg1