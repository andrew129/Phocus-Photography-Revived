import React from 'react';
import './style.css';

function Footer(props) {
  return (
    <div className='footer'>
      <p id='copyright'>© 2019 Phocus-Photography </p>
      <a href='https://github.com/andrew129?tab=repositories'>Andrew Stiles </a>
      ||
      <a href='https://github.com/HoChiefMinh?tab=repositories'> Minh Pham</a>
    </div>
  );
}

export default Footer;
