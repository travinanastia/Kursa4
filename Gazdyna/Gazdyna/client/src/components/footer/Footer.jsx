/** @format */

import React from 'react';

const Footer = () => {
  return (
    <footer className='border-b-4 border-primary bg-yellow-50 pt-12 '>
      <div className='box  flex justify-center w-full gap-4'>
        <p className='text-sm text-center'>&copy; {new Date().getFullYear()} Gazdyna. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
