import React from 'react'

import '../style/index.css'

class Footer extends React.Component {

  

  render() {
    return (
      <div className="footer_container">
        <p className='copywrite'>© 2007 - 2022 Website content and images protected by Australian Copyright Law</p>
        <p className='acknowledgement'>The team behind Green_Book acknowledge the Boonwurrung People - Traditional Custodians of the land on which we are fortunate to dream, create, live and work, and recognises their continuing connection to land, water and community. We pay our respects to Elders past, present and emerging.</p>
      </div>
    );
  }
}

export default Footer;