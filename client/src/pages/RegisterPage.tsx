import { FC } from 'react';
import RegisterForm from '../components/RegisterForm';
import ThreeD from '../components/ThreeD';

interface RegisterPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterPage: FC<RegisterPageProps> = ({ setIsAuthenticated }) => {
  return (
    <div className='flex w-full h-screen'>
      {/* Register part */}
      <div className='w-full flex items-start justify-center pt-12 lg:w-1/2'>
        <RegisterForm setIsAuthenticated={setIsAuthenticated} />
      </div>

      {/* Right side of Animation */}
      <div className='hidden relative  lg:flex w-1/2 items-center justify-center '>
        <ThreeD />
      </div>
    </div>
  );
};

export default RegisterPage;
