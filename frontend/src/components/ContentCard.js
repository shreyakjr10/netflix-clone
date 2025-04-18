
import React from 'react';
import { Link } from 'react-router-dom';

const ContentCard = ({ content }) => {
  return (
    <Link to={`/movie/${content.id}`} className="relative block">
      <div className="relative overflow-hidden rounded-md transition-transform duration-300 hover:scale-105 hover:z-10">
        <img 
          src={content.imageUrl} 
          alt={content.title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
          <h3 className="text-netflix-white font-bold">{content.title}</h3>
          <p className="text-netflix-light-grey text-sm">{content.releaseYear} • {content.genre}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
