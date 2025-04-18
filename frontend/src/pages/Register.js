
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (error) {
      setError('Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-netflix-black p-4">
      <div className="bg-black bg-opacity-75 p-8 rounded w-full max-w-md">
        <h2 className="text-netflix-white text-3xl font-bold mb-6">Sign Up</h2>
        
        {error && <div className="bg-netflix-red bg-opacity-20 text-netflix-red p-3 rounded mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full p-3 bg-gray-700 text-netflix-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
          
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 bg-gray-700 text-netflix-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 bg-gray-700 text-netflix-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full p-3 bg-gray-700 text-netflix-white rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-netflix-red text-netflix-white p-3 rounded font-bold hover:bg-netflix-red-dark transition-colors disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-netflix-grey">
          <p>
            Already have an account? <Link to="/login" className="text-netflix-white hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
