
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SubscriptionModal from './SubscriptionModal';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If user is logged in but doesn't have an active subscription,
  // we'll show the subscription modal but still render the requested page
  if (currentUser && !currentUser.hasActiveSubscription) {
    return (
      <>
        <SubscriptionModal />
        {children}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
