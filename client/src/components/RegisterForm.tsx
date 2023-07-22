import { FC, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

export type BodyType = {
  email: string;
  password: string;
};

interface RegisterFormProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: FC<RegisterFormProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState<string>(
    'Please fill in to create your account'
  );

  // One value delay pitfall occurs, if we implement const [input, setInput] = useState<BodyType>({ email: '', password: '' });
  // input not gonna be changed until next render
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // We gonna use userInput as req.body sending to backend, cos of One value delay pitfall situation
      const userInput: BodyType = { email, password };

      //TODO: Send register request to backend, and navigate to todo app page
      try {
        const res = await fetch('http://localhost:3001/auth/register', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(userInput),
        });
        const data = await res.json();

        if (data.message === 'User already exists.') {
          setNotification(data.message);
          return;
        }
        if (data.message === 'Signed you up successfully.') {
          // Save token in local storage
          // localStorage.setItem('token', data.token);
          // setNotification('Signed you up successfully.') literally doesn't work. Why?
          setNotification(data.message);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log((error as Error).message);
      }

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setNotification('Click Sign Me Up to Register');
    } else {
      setNotification('Password and confirmed password do not match');
      setPassword('');
      setConfirmPassword('');
      return;
    }
  };

  return (
    <div className='font-poppins bg-white px-10 py-16 rounded-3xl border-2 border-gray-200 shadow-md w-[450px] sm:w-[500px]'>
      <h1 className='text-4xl font-semibold text-center'>Register</h1>
      <p className='font-medium text-md text-pink-400 mt-4 text-center'>
        {notification}
      </p>
      <form className='mt-8' onSubmit={handleRegisterSubmit}>
        <div className='relative flex items-center  text-gray-400 focus-within:text-gray-600'>
          {/* email input*/}
          <input
            className='w-full border-2 border-gray-300 rounded-xl p-3 px-10 mt-1 bg-transparent border-opacity-50 outline-none focus:border-gray-400 transition duration-300'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* tell browser the icon ignores pointer events, then we can focus the input field even we click the icon */}
          <HiOutlineMail className='h-5 w-5 absolute ml-3 mt-1 pointer-events-none' />
        </div>
        <div className='mt-3'>
          {/* <label className='text-lg font-medium'>Password</label> */}
          {/* we put text-gray-400 in the div instead of icon itself, because we want to use focus-within to change the font weight when input field is focused */}
          <div className='relative flex items-center  text-gray-400 focus-within:text-gray-600'>
            {/* Password input */}
            <input
              className='w-full border-2 border-gray-300 rounded-xl p-3 px-10 mt-1 bg-transparent border-opacity-50 outline-none focus:border-gray-400 transition duration-300'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <RiLockPasswordLine className='h-5 w-5 absolute ml-3 mt-1 pointer-events-none' />
          </div>
        </div>
        <div className='mt-3'>
          <div className='relative flex items-center  text-gray-400 focus-within:text-gray-600'>
            {/* confirmPassword input */}
            <input
              className='w-full border-2 border-gray-300 rounded-xl p-3 px-10 mt-1 bg-transparent border-opacity-50 outline-none focus:border-gray-400 transition duration-300'
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <RiLockPasswordLine className='h-5 w-5 absolute ml-3 mt-1 pointer-events-none' />
          </div>
        </div>
        {/* <div className='mt-4 flex justify-center items-center text-center'>
          <div className='text-base text-gray-600'>{notification}</div>
        </div> */}
        <div className='mt-10 flex flex-col gap-y-4'>
          <button
            className='border border-gray-400 bg-gray-100 rounded-lg text-zinc-800 py-3 w-full shadow-md'
            type='submit'
          >
            Sign Me Up
          </button>

          <div className='mt-0 flex justify-center items-center text-gray-500'>
            {/* <hr className='border-gray-300' /> */}
            <p className='text-center text-md'>or</p>
            {/* <hr className='border-gray-300' /> */}
          </div>

          <NavLink
            className='flex text-base border bg-gray-100 py-3 rounded-lg border-gray-400 justify-center items-center gap-4 mt-0 font-medium shadow-md text-zinc-800'
            to='/login'
          >
            Back to Sign In
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
