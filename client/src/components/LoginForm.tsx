import { FC, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { IoEyeOutline } from 'react-icons/io5';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import GoogleIcon from './GoogleIcon';

interface LoginFormProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: FC<LoginFormProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState<string>('welcome@todolist.com');
  const [password, setPassword] = useState<string>('qaz123');

  const [alertMsg, setAlertMsg] = useState<string>(
    'Please login to see you todo list.'
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInput = { email, password };

    //TODO: Send login request to backend, and navigate to todo app page
    // Must include credentials: 'include' inside fetch, or cookie won't show in application
    // credentials: 'include' means this fetch request will include 'cookie' and 'Authorization header'
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });
      const data = await res.json();

      console.log('From loginForm', data);

      setIsAuthenticated(true);

      // if (data.message) {
      //   console.log('Data without token', data);
      //   setAlertMsg(data.message);
      //   return;
      // }
      // if (data.token) {
      //   // Save token in local storage
      //   localStorage.setItem('token', data.token);
      //   console.log('data with token: ', data);
      //   // when isAuthenticated is true, page directs to todo app page
      //   setIsAuthenticated(true);
      // }
    } catch (error: unknown) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className='font-poppins bg-white px-10 py-16 rounded-3xl border-2 border-gray-200 shadow-md w-[450px] sm:w-[500px]'>
      <h1 className='text-4xl font-semibold text-center'>Welcome</h1>
      <p className='font-medium text-lg text-pink-400 mt-4 text-center'>
        {alertMsg}
      </p>
      <form className='mt-8' onSubmit={handleSubmit}>
        <div className='relative flex items-center  text-gray-400 focus-within:text-gray-600'>
          {/* <label className='text-lg font-medium'>Email</label> */}
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
            <input
              className='w-full border-2 border-gray-300 rounded-xl p-3 px-10 mt-1 bg-transparent border-opacity-50 outline-none focus:border-gray-400 transition duration-300'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <RiLockPasswordLine className='h-5 w-5 absolute ml-3 mt-1 pointer-events-none' />
            <IoEyeOutline className='text-xl absolute mt-7 right-3 -translate-y-1/2 cursor-pointer' />
          </div>
        </div>
        <div className='mt-4 flex justify-between items-center'>
          <div>
            <input type='checkbox' id='signedIn' />
            <label
              className='ml-2 font-medium text-base  text-zinc-700'
              htmlFor='signedIn'
            >
              Stay signed in
            </label>
          </div>
          <button className='font-medium text-base text-zinc-800'>
            Forgot password
          </button>
        </div>
        <div className='mt-5 flex flex-col gap-y-4'>
          <button
            type='submit'
            className='border border-gray-400 bg-gray-100 rounded-lg text-zinc-800 text-lg py-3 w-full shadow-md '
          >
            Sign in
          </button>

          <div className='mt-0 flex justify-center items-center text-gray-500'>
            {/* <hr className='border-gray-300' /> */}
            <p className='text-center text-md'>or</p>
            {/* <hr className='border-gray-300' /> */}
          </div>

          <button className='flex text-base border bg-gray-100 py-3 rounded-lg border-gray-400 justify-center items-center gap-4 mt-0 font-medium shadow-md text-zinc-800'>
            <GoogleIcon />
            Sign in with Google
          </button>
        </div>
        <div className='mt-8 flex justify-center items-center gap-4'>
          <p className='font-medium text-base text-zinc-600'>
            Don't have an account?
          </p>
          <Link className='text-zinc-800 text-base font-medium' to='/register'>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
