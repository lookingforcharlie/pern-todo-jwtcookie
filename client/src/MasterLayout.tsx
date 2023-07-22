import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const MasterLayout = () => {
  return (
    <>
      <Header />
      {/* Outlet stands for all the web content in each route */}
      <main>
        <Outlet />
      </main>

      <div className='border'>I am the footer</div>
    </>
  );
};

export default MasterLayout;

// This MasterLayout file is for React-Router-Dom to let <Header /> and other component wrap the content
// by using Outlet
// meaning <Header /> or other component such as footer will always show on the page
