

const BirthDetailsPg3 = ({birth}) => {

    return(
        <div>
            Estimated Gestation: {birth.estimated_gestation} weeks<br/>
            Severe Jaundice? {birth.severe_jaundice ? "Yes" : "No"}<br/>
            {birth.severe_jaundice ? <div>{"Exchange Transfusion for Jaundice: " + birth.exchange_transfusion_for_jaundice ? " Yes" : "N/A"}<br/></div> : null}
            Newborn Bloodspot Screening Complete? {birth.newborn_bloodspot_screening_test_completed ? "Yes" : "No"}<br/>
            {birth.newborn_bloodspot_screening_test_completed ? "Newborn Bloodspot Date: " + new Date(birth.bloodspot_sample_date).toString().slice(0,15) : null}<br/>
            Apgar One Minute: {birth.apgar_one_minute}<br/>
            Apgar Five Minute: {birth.apgar_five_minute}<br/>
            Problems Requiring Treatment: {birth.problems_requiring_treatment ? birth.problems_requiring_treatment : "None"}<br/>
            Intensive Care in First 48 Hours? {birth.admission_to_intensive_care_nursery_48hours ? "Yes" : "No" }<br/>
            {birth.admission_to_intensive_care_nursery_48hours ? <div>{"Intensive care reason:" + birth.intensive_care_reason}<br/></div> : null}
            Special Care in First 48 Hours? {birth.admission_to_special_care_nursery_48hours ? "Yes" : "No" }<br/>
            {birth.admission_to_special_care_nursery_48hours ? <div>{"Special Care Reason: " + birth.special_care_reason}<br/></div> : null}
        </div>
    )

}

export default BirthDetailsPg3