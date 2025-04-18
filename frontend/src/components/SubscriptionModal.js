
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllPlans, createSubscription } from '../services/api';

const SubscriptionModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getAllPlans();
        setPlans(response.data);
        if (response.data.length > 0) {
          setSelectedPlan(response.data[1]); // Default to standard plan
        }
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch subscription plans');
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    
    try {
      setLoading(true);
      await createSubscription({
        userId: currentUser.id,
        planId: selectedPlan.id,
        paymentMethod: 'Credit Card' // This would be selected by the user in a real app
      });
      
      // Reload user to update subscription status
      window.location.reload();
    } catch (error) {
      setError('Failed to create subscription');
      setLoading(false);
    }
  };

  const handleSubscriptionsRedirect = () => {
    navigate('/subscriptions');
    setIsOpen(false);
  };

  if (!isOpen || loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-netflix-black border border-netflix-grey rounded-lg p-6 max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-netflix-white">Choose your plan</h2>
          <button 
            onClick={handleClose}
            className="text-netflix-white hover:text-netflix-light-grey"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {error && <p className="text-netflix-red mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {plans.map(plan => (
            <div 
              key={plan.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedPlan && selectedPlan.id === plan.id 
                  ? 'border-netflix-red bg-netflix-red bg-opacity-10' 
                  : 'border-netflix-grey hover:border-netflix-light-grey'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <h3 className="text-xl font-bold text-netflix-white mb-2">{plan.name}</h3>
              <p className="text-netflix-light-grey mb-2">${plan.price}/month</p>
              <ul className="text-netflix-light-grey text-sm">
                <li>• Video quality: {plan.quality}</li>
                <li>• Watch on {plan.deviceCount} {plan.deviceCount > 1 ? 'devices' : 'device'}</li>
              </ul>
            </div>
          ))}
        </div>
        
        {selectedPlan && (
          <div className="text-center mb-6">
            <p className="text-netflix-light-grey mb-4">{selectedPlan.description}</p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <button
            onClick={handleSubscriptionsRedirect}
            className="text-netflix-light-grey underline mb-4 md:mb-0"
          >
            View all plan options
          </button>
          <button
            onClick={handleSubscribe}
            disabled={!selectedPlan}
            className="bg-netflix-red text-netflix-white px-6 py-2 rounded font-bold hover:bg-netflix-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
