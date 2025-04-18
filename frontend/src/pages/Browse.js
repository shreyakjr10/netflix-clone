
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllContent, getContentByType, getContentByGenre } from '../services/api';
import Hero from '../components/Hero';
import ContentRow from '../components/ContentRow';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const genreParam = searchParams.get('genre');
  
  const [contents, setContents] = useState([]);
  const [featuredContent, setFeaturedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        let response;
        
        if (typeParam) {
          response = await getContentByType(typeParam);
        } else if (genreParam) {
          response = await getContentByGenre(genreParam);
        } else {
          response = await getAllContent();
        }
        
        const data = response.data;
        setContents(data);
        
        // Set a random content as featured
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setFeaturedContent(data[randomIndex]);
        }
        
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch content');
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [typeParam, genreParam]);
  
  const groupContentByGenre = () => {
    const genreMap = {};
    
    contents.forEach(content => {
      if (!genreMap[content.genre]) {
        genreMap[content.genre] = [];
      }
      genreMap[content.genre].push(content);
    });
    
    return genreMap;
  };
  
  const groupContentByType = () => {
    const typeMap = {
      MOVIE: [],
      SERIES: []
    };
    
    contents.forEach(content => {
      if (typeMap[content.type]) {
        typeMap[content.type].push(content);
      }
    });
    
    return typeMap;
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-netflix-white">Loading...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-netflix-red">{error}</div>;
  }
  
  const genreMap = groupContentByGenre();
  const typeMap = groupContentByType();
  
  return (
    <div className="min-h-screen bg-netflix-black text-netflix-white">
      <Hero content={featuredContent} />
      
      <div className="px-8 pb-16">
        {/* If filtering by type, show genre rows */}
        {typeParam && Object.entries(genreMap).map(([genre, contents]) => (
          <ContentRow key={genre} title={genre} contents={contents} />
        ))}
        
        {/* If filtering by genre, show type rows */}
        {genreParam && (
          <>
            {typeMap.MOVIE.length > 0 && <ContentRow title="Movies" contents={typeMap.MOVIE} />}
            {typeMap.SERIES.length > 0 && <ContentRow title="TV Shows" contents={typeMap.SERIES} />}
          </>
        )}
        
        {/* If no filters, show everything organized */}
        {!typeParam && !genreParam && (
          <>
            {typeMap.MOVIE.length > 0 && <ContentRow title="Movies" contents={typeMap.MOVIE} />}
            {typeMap.SERIES.length > 0 && <ContentRow title="TV Shows" contents={typeMap.SERIES} />}
            {Object.entries(genreMap).map(([genre, contents]) => (
              <ContentRow key={genre} title={genre} contents={contents} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
