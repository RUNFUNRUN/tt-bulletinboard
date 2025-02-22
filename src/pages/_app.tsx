import { Header } from '@/components/header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-dvh bg-gray-100'>
      <Header />
      <div className='container mx-auto py-10'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
