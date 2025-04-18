
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-caec-4e7c-843c-1e646140dccf/c4a30716-9024-4596-b929-0652c93a1ef8/US-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
          alt="Netflix Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="relative text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-netflix-white mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-xl md:text-2xl text-netflix-white mb-6">
          Watch anywhere. Cancel anytime.
        </p>
        <div className="mb-6">
          <p className="text-xl text-netflix-white mb-4">
            Ready to watch? Sign up to create or restart your membership.
          </p>
          <Link 
            to="/register" 
            className="bg-netflix-red text-netflix-white px-6 py-3 text-xl font-bold rounded hover:bg-netflix-red-dark"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
