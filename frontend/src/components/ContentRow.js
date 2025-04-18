
import React from 'react';
import ContentCard from './ContentCard';

const ContentRow = ({ title, contents }) => {
  return (
    <div className="mb-8">
      <h2 className="text-netflix-white text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {contents.map(content => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
