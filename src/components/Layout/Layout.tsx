import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export const Layout = () => {
  return (
    <>
      <Navbar>
        <main className=' w-full pt-16 '>
          <Outlet />
        </main>
      </Navbar>
    </>
  );
};
