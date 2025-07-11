'use client';

import { useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { testReduxStore } from '../libs/test-redux';

export default function Dashboard() {
  const { content, userPrefs, currentData, isLoading, hasError, errorMessage } = useContent();
  
  // Test Redux on mount
  useEffect(() => {
    testReduxStore();
  }, []);
  
  return (
    <div className={`min-h-screen ${userPrefs.darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Personalized Content Dashboard
        </h1>
        
        {/* Debug Info */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <h2 className="font-semibold mb-2">Redux Debug Info:</h2>
          <p>Current Section: {content.currentSection}</p>
          <p>Selected Categories: {userPrefs.selectedCategories.join(', ')}</p>
          <p>Dark Mode: {userPrefs.darkMode ? 'ON' : 'OFF'}</p>
          <p>Loading: {isLoading ? 'YES' : 'NO'}</p>
          <p>News Count: {currentData.news.length}</p>
          <p>Movies Count: {currentData.movies.length}</p>
          <p>Posts Count: {currentData.posts.length}</p>
          <p>Favorites: {content.favoriteNews.length + content.favoriteMovies.length + content.favoritePosts.length}</p>
        </div>
        
        {/* Error Display */}
        {hasError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {errorMessage}
          </div>
        )}
        
        {/* Loading Display */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading content...</p>
          </div>
        )}
        
        {/* Content Display */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.news.map((article, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-sm mb-2">{article.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{article.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
