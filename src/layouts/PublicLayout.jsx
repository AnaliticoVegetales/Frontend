import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main className='h-full w-full overflow-auto bg-gradient-to-r from-black via-gray-900 to-gray-800'>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;