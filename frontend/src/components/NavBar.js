
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-netflix-black py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-netflix-red text-2xl font-bold">NETFLIX CLONE</Link>
        {currentUser && (
          <div className="ml-8 space-x-4">
            <Link to="/browse" className="text-netflix-white hover:text-netflix-light-grey">Browse</Link>
            <Link to="/browse?type=MOVIE" className="text-netflix-white hover:text-netflix-light-grey">Movies</Link>
            <Link to="/browse?type=SERIES" className="text-netflix-white hover:text-netflix-light-grey">TV Shows</Link>
          </div>
        )}
      </div>
      <div>
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-netflix-white hover:text-netflix-light-grey">
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="text-netflix-white hover:text-netflix-light-grey"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-netflix-white hover:text-netflix-light-grey">Sign In</Link>
            <Link 
              to="/register" 
              className="bg-netflix-red text-white px-4 py-1 rounded hover:bg-netflix-red-dark"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
