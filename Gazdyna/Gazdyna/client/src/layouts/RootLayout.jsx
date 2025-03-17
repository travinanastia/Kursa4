/** @format */

import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

const RootLayout = () => {
  return (
    <div className='min-h-screen flex flex-col '>
      <Header />
      <div className='flex-1 basis-0 w-full py-5'>
        <Outlet />
      </div>
      <Footer className='mb-0' /> {/* Ensure Footer doesn’t add extra margin */}
    </div>
  );
};

export default RootLayout;
