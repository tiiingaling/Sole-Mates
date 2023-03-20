import React from 'react';
import myLogo from '../images/logo.png';

const Logo = () => {
  return (
    <div className='flex justify-center items-center'>
      <img className="w-6/12" src={myLogo} alt="My Image" />
    </div>
  );
};

export default Logo;