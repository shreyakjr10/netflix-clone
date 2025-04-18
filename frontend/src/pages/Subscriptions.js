
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllPlans, getActiveSubscription, createSubscription, cancelSubscription } from '../services/api';

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all subscription plans
        const plansResponse = await getAllPlans();
        setPlans(plansResponse.data);
        
        // If user has an active subscription, fetch it
        if (currentUser.hasActiveSubscription) {
          try {
            const subscriptionResponse = await getActiveSubscription(currentUser.id);
            setActiveSubscription(subscriptionResponse.data);
            
            // Set selected plan to the active subscription plan
            const activePlan = plansResponse.data.find(plan => plan.id === subscriptionResponse.data.planId);
            if (activePlan) {
              setSelectedPlan(activePlan);
            }
          } catch (error) {
            console.error('Failed to fetch active subscription:', error);
          }
        } else {
          // Default to standard plan for new subscriptions
          const standardPlan = plansResponse.data.find(plan => plan.name === 'Standard');
          if (standardPlan) {
            setSelectedPlan(standardPlan);
          } else if (plansResponse.data.length > 0) {
            setSelectedPlan(plansResponse.data[0]);
          }
        }
        
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch subscription information');
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

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
      
      // Reload to reflect changes
      window.location.reload();
    } catch (error) {
      setError('Failed to create subscription');
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!activeSubscription) return;
    
    try {
      setLoading(true);
      await cancelSubscription(activeSubscription.id);
      
      // Reload to reflect changes
      window.location.reload();
    } catch (error) {
      setError('Failed to cancel subscription');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-netflix-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-netflix-black text-netflix-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Subscriptions</h1>
        
        {error && <div className="bg-netflix-red bg-opacity-20 text-netflix-red p-4 rounded mb-6">{error}</div>}
        
        {activeSubscription ? (
          <div className="mb-8">
            <div className="bg-netflix-black border border-netflix-grey rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Your Current Plan</h2>
              
              <div className="border border-netflix-red bg-netflix-red bg-opacity-10 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-bold text-netflix-white mb-2">
                  {selectedPlan?.name} Plan
                </h3>
                <p className="text-netflix-light-grey mb-2">${selectedPlan?.price}/month</p>
                <p className="text-netflix-light-grey mb-1">Video quality: {selectedPlan?.quality}</p>
                <p className="text-netflix-light-grey">
                  Watch on {selectedPlan?.deviceCount} {selectedPlan?.deviceCount > 1 ? 'devices' : 'device'}
                </p>
              </div>
              
              <button
                onClick={handleCancelSubscription}
                className="bg-netflix-grey text-netflix-white px-6 py-2 rounded font-bold hover:bg-opacity-70"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Choose a Plan</h2>
            
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
              <div>
                <p className="text-netflix-light-grey mb-4">{selectedPlan.description}</p>
                
                <button
                  onClick={handleSubscribe}
                  className="bg-netflix-red text-netflix-white px-6 py-2 rounded font-bold hover:bg-netflix-red-dark"
                >
                  Subscribe Now
                </button>
              </div>
            )}
          </div>
        )}
        
        <button
          onClick={() => navigate(-1)}
          className="text-netflix-light-grey underline"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Subscriptions;
