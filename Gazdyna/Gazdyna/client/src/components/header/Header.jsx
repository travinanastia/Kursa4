/** @format */

import { Logo, Button, Avatar } from '..';
import { NavLink } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { Badge } from '@mui/material';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const user = useAuth();

  return (
    <header className='shadow-sm sticky top-0 backdrop-blur-sm bg-[#fffefc] z-20'>
      <div className='box !mb-0 flex justify-between items-center py-3'>
        <Logo />
        {/* Desktop navbar */}
        <nav>
          {/* Navbar links */}
          <ul className='flex gap-10'>
            <li>
              <NavLink
                to={'/'}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Home
              </NavLink>
            </li>
            {user && user?.isAdmin && (
              <li>
                <NavLink
                  to={'/dashboard/users'}
                  className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to={'/recipe'}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/ai-recipe'}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                <Badge
                  badgeContent={'New'}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ff0c7e',
                      color: 'white',
                    },
                  }}
                >
                  Ai Recipes
                </Badge>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={'/contact'}
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* Sign in button */}
        {user ? (
          <Avatar />
        ) : (
          <NavLink to={'/auth/signin'} className='hidden md:block'>
            <Button content={'Sign In'} customCss={'max-w-max rounded-full'} icon={<FiLogIn />} />
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
