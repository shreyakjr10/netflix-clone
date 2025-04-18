
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getContentById } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await getContentById(id);
        setContent(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch content details');
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [id]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-netflix-white">Loading...</div>;
  }
  
  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-netflix-red">
        <p className="mb-4">{error || 'Content not found'}</p>
        <Link to="/browse" className="text-netflix-white underline">Back to Browse</Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-netflix-black text-netflix-white pb-16">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-netflix-black mb-8">
        <div className="absolute inset-0">
          <img 
            src={content.imageUrl} 
            alt={content.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-netflix-black"></div>
        </div>
      </div>
      
      {/* Content Details */}
      <div className="px-8 max-w-5xl mx-auto -mt-32 relative z-10">
        <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
        
        <div className="flex items-center text-sm text-netflix-light-grey mb-6">
          <span>{content.releaseYear}</span>
          <span className="mx-2">•</span>
          <span>{content.type === 'MOVIE' ? 'Movie' : 'TV Series'}</span>
          <span className="mx-2">•</span>
          <span>{content.genre}</span>
          <span className="mx-2">•</span>
          <span>⭐ {content.rating}/10</span>
        </div>
        
        <div className="flex space-x-4 mb-8">
          <button className="bg-netflix-red text-netflix-white px-6 py-2 rounded font-bold hover:bg-netflix-red-dark flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Play
          </button>
          <button className="bg-netflix-grey text-netflix-white px-6 py-2 rounded font-bold hover:bg-opacity-70 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            More Info
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-netflix-light-grey mb-6">{content.description}</p>
            
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="flex flex-wrap gap-2">
              {content.cast && content.cast.map((actor, index) => (
                <span key={index} className="bg-netflix-grey bg-opacity-30 px-3 py-1 rounded-full text-sm">
                  {actor}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <img 
              src={content.imageUrl} 
              alt={content.title} 
              className="w-full rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
