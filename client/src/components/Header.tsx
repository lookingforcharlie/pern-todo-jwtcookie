import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../../public/todo_logo.png';

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const [userEmail, setUserEmail] = useState<string>('');

  // const user_token = localStorage.token;

  // It's a bit overkill to get user email from server, cos user login with user's email
  // It can be used to retrieve other info, such as user name.
  // But I didn't create user_name column in the database
  async function getUserEmail() {
    try {
      const res = await fetch('http://localhost:3001/header/', {
        method: 'GET',
        // Without credentials: 'include', the cookie won't be sent with this GET request headers
        // You can check it in Network Panel
        credentials: 'include',
      });
      const data = await res.json();
      console.log('Getting user email in Header component:', data);
      setUserEmail(data.user_email);

      // Without this condition, every time you refresh the page, isAuthenticated will be true
      // if (data.user_email === undefined) return;
      // setIsAuthenticated(true);
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  // If I put [] inside this useEffect, it will occur one state delay situation.
  // Without [], it runs the effect on every render.
  // With [], it runs only one time when the component mounts.
  useEffect(() => {
    getUserEmail();
  });

  const handleLogout = async () => {
    if (isAuthenticated === true) {
      try {
        const res = await fetch('http://localhost:3001/auth/logout', {
          method: 'GET',
          // Without credentials: 'include', the cookie won't be sent with this GET request headers
          // You can check it in Network Panel
          credentials: 'include',
        });

        const data = await res.json();
        console.log('Click logout: ', data);
        if (data === true) {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    }
  };
  return (
    <div className='w-full mx-auto bg-gray-300 shadow-md px-8 py-1 text-zinc-700'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <img src={icon} className='w-16 md:w-24' />
          <div className='text-base md:text-2xl'>Todo App</div>
        </div>
        <div className='flex items-center space-x-4'>
          <div>{userEmail && `Hi ${userEmail}`}</div>
          {/* <div>temp name</div> */}
          {/* Compared with Link, NavLink offers us a class of active, we can leverage it in CSS */}
          <NavLink to='/' className='md:text-xl'>
            Home
          </NavLink>
          <NavLink to='/todos' className='md:text-xl'>
            MyTodos
          </NavLink>
          <NavLink to='/login' className='md:text-xl' onClick={handleLogout}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
