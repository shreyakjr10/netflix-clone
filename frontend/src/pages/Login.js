
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/browse');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-netflix-black p-4">
      <div className="bg-black bg-opacity-75 p-8 rounded w-full max-w-md">
        <h2 className="text-netflix-white text-3xl font-bold mb-6">Sign In</h2>
        
        {error && <div className="bg-netflix-red bg-opacity-20 text-netflix-red p-3 rounded mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-netflix-red text-netflix-white p-3 rounded font-bold hover:bg-netflix-red-dark transition-colors disabled:opacity-70"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 text-netflix-grey">
          <p>
            New to Netflix Clone? <Link to="/register" className="text-netflix-white hover:underline">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
