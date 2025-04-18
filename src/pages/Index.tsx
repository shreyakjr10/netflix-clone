
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <div className="relative min-h-screen flex items-center justify-center">
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Netflix Clone
          </h1>
          <p className="text-xl md:text-2xl text-white mb-6">
            A microservices-based streaming platform clone with Spring Boot and React
          </p>
          <div className="mb-6">
            <p className="text-xl text-white mb-4">
              This is a demonstration project. Click below to explore the frontend.
            </p>
            <a 
              href="http://localhost:3000" 
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-red-600 text-white px-6 py-3 text-xl font-bold rounded hover:bg-red-700"
            >
              Launch Frontend
            </a>
          </div>
          
          <div className="mt-8 text-center text-gray-300">
            <p className="mb-2">Backend microservices running on:</p>
            <ul>
              <li>Discovery Service: <a href="http://localhost:8761" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">http://localhost:8761</a></li>
              <li>API Gateway: http://localhost:8080</li>
              <li>Auth Service: http://localhost:8081</li>
              <li>Content Service: http://localhost:8082</li>
              <li>Subscription Service: http://localhost:8083</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
