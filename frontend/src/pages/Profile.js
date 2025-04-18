
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center text-netflix-white">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-netflix-black text-netflix-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account</h1>
        
        <div className="bg-netflix-black border border-netflix-grey rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Profile</h2>
              <p className="text-netflix-light-grey mb-1">{currentUser.name}</p>
              <p className="text-netflix-light-grey mb-4">{currentUser.email}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/profile/edit" className="text-netflix-light-grey hover:text-netflix-white">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-netflix-black border border-netflix-grey rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Subscription</h2>
              <p className="text-netflix-light-grey mb-1">
                Status: {currentUser.hasActiveSubscription ? 'Active' : 'Inactive'}
              </p>
              {currentUser.hasActiveSubscription ? (
                <p className="text-netflix-light-grey">
                  Next billing date: [Dynamic Date]
                </p>
              ) : (
                <p className="text-netflix-light-grey">
                  Subscribe to watch content
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to="/subscriptions" 
                className="text-netflix-light-grey hover:text-netflix-white"
              >
                {currentUser.hasActiveSubscription ? 'Manage Subscription' : 'Subscribe Now'}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-netflix-black border border-netflix-grey rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p className="text-netflix-light-grey">Manage your account settings</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/profile/settings" className="text-netflix-light-grey hover:text-netflix-white">
                Change Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
