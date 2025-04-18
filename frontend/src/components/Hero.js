
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ content }) => {
  if (!content) return null;

  return (
    <div className="relative h-[70vh] bg-netflix-black mb-8">
      <div className="absolute inset-0">
        <img 
          src={content.imageUrl} 
          alt={content.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black to-transparent"></div>
      </div>
      <div className="relative h-full flex flex-col justify-center px-12 md:px-20 lg:px-32">
        <h1 className="text-netflix-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{content.title}</h1>
        <p className="text-netflix-white text-lg max-w-2xl mb-6">{content.description}</p>
        <div className="flex space-x-4">
          <Link 
            to={`/movie/${content.id}`} 
            className="bg-netflix-red text-netflix-white px-6 py-2 rounded font-bold hover:bg-netflix-red-dark"
          >
            Play
          </Link>
          <Link 
            to={`/movie/${content.id}`} 
            className="bg-netflix-grey text-netflix-white px-6 py-2 rounded font-bold hover:bg-opacity-70"
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
