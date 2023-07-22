import { FC } from 'react';
import LoginForm from '../components/LoginForm';
import ThreeD from '../components/ThreeD';

interface LoginPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  return (
    <div className='flex w-full h-screen'>
      {/* Login part */}
      <div className='w-full flex items-start justify-center pt-12 lg:w-1/2'>
        <LoginForm setIsAuthenticated={setIsAuthenticated} />
      </div>

      {/* Right side of Animation */}
      <div className='hidden relative  lg:flex w-1/2 items-center justify-center '>
        <ThreeD />
      </div>
    </div>
  );
};

export default LoginPage;
