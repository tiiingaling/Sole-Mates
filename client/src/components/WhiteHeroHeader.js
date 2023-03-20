import React from 'react';
import WhiteHeader from '../images/whiteHeader.png';

const HeroHeader = () => {
  return (
    <div className='flex justify-center items-center'>
      <img className="w-12/12" src={WhiteHeader} alt="My Image" />
    </div>
  );
};

export default HeroHeader ;