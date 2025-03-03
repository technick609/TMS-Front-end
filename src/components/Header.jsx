import React from 'react';
import WSALogo from '../assets/wsa-logo.svg';

const Header = () => {
  return (
    <div className='header-container-div'>
        <img src={WSALogo} alt="Main logo" width={183} height={63} />
    </div>
  )
}

export default Header