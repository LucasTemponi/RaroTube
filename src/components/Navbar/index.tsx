import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Navegacao } from '../Navegacao';

const Navbar = () => {
  return (
    <header className='flex items-center justify-between bg-gray-200 px-6 py-4'>
      <div className='flex items-center space-x-2'>
        <div className='flex items-center h-12 w-32'>
          <Logo />
        </div>
      </div>
      <div className='felx items-center space-x-2 font-bold'>
        <Navegacao />
      </div>
    </header>
  );
};

export default Navbar;
