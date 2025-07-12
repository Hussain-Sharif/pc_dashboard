import { useAppSelector, useAppDispatch } from '../store/store';
import { 
  fetchAllContent, 
  setCurrentSection, 
  addToFavorites, 
  removeFromFavorites 
} from '../store/slices/contentSlice';
import { useEffect } from 'react';

export const useContent = () => {
  const dispatch = useAppDispatch();
  const content = useAppSelector(state => state.content);
  const userPrefs = useAppSelector(state => state.userPrefs);
  
  // Fetch content when categories change
  useEffect(() => {
    if (userPrefs.selectedCategories.length > 0) {
      dispatch(fetchAllContent(userPrefs.selectedCategories));
    }
  }, [userPrefs.selectedCategories, dispatch]);
  
  // Helper functions
  const switchSection = (section: 'personalized' | 'trending' | 'favorites') => {
    dispatch(setCurrentSection(section));
  };
  
  const addFavorite = (type: 'news' | 'movie' | 'post', item: any) => {
    dispatch(addToFavorites({ type, item }));
  };
  
  const removeFavorite = (type: 'news' | 'movie' | 'post', id: string | number) => {
    dispatch(removeFromFavorites({ type, id }));
  };
  
  // Get current section data
  const getCurrentSectionData = () => {
    switch (content.currentSection) {
      case 'personalized':
        return {
          news: content.personalizedNews,
          movies: content.movies,
          posts: content.posts
        };
      case 'trending':
        return {
          news: content.trendingNews,
          movies: content.movies,
          posts: content.posts
        };
      case 'favorites':
        return {
          news: content.favoriteNews,
          movies: content.favoriteMovies,
          posts: content.favoritePosts
        };
      default:
        return { news: [], movies: [], posts: [] };
    }
  };
  
  return {
    // State
    content,
    userPrefs,
    currentData: getCurrentSectionData(),
    isLoading: content.allContentLoading,
    
    // Actions
    switchSection,
    addFavorite,
    removeFavorite,
    
    // Helpers
    hasError: !!(content.newsError || content.moviesError || content.postsError),
    errorMessage: content.newsError || content.moviesError || content.postsError
  };
};
