import { useAppSelector, useAppDispatch } from '../store/store';
import { 
  fetchAllContent, 
  setCurrentSection, 
  addToFavorites, 
  removeFromFavorites, 
  ContentState,
 
} from '../store/slices/contentSlice';
import { use, useCallback, useEffect } from 'react';
import { shuffleCards } from '@/constants/shuffleCards';
import { NewsCategory } from '@/constants/newsCategories';
import { MovieGenre } from '@/constants/movieGenreOptions';
import { setCurrentGenres, setCurrentNewsCategory } from '@/store/slices/userPrefsSlice';

export const useContent = () => {
  const dispatch = useAppDispatch();
  const content:ContentState = useAppSelector(state => state.content);
  const userPrefs = useAppSelector(state => state.userPrefs);
  
  // Fetch content when categories change
  useEffect(() => {
    dispatch(fetchAllContent(userPrefs.currentNewsCategory));
  }, [userPrefs.currentNewsCategory, dispatch]);
  
  // Helper functions
  const switchSection = useCallback((section: 'personalized' | 'trending' | 'favorites') => {
    dispatch(setCurrentSection(section));
  },[dispatch]);
  
  const addFavorite = (type: 'news' | 'movie' | 'post', item: any) => {
    dispatch(addToFavorites({ type, item }));
  };
  
  const removeFavorite = (type: 'news' | 'movie' | 'post', id: string | number) => {
    dispatch(removeFromFavorites({ type, id }));
  };
  
  // Get current section data
  const getCurrentSectionData =useCallback( () => {
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
  },[content.currentSection, content.personalizedNews, content.trendingNews, content.favoriteNews, content.movies, content.posts, content.favoriteMovies, content.favoritePosts]);

  const updateCurrentNewsCategory=(category:NewsCategory| string) => {
    dispatch(setCurrentNewsCategory(category));
  }

  const updateCurrentGenre=(genre:MovieGenre[])=>{
      dispatch(setCurrentGenres(genre))
  }

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

    //Filters in My Feed page
    updateCurrentNewsCategory,
    updateCurrentGenre,
    
    // Helpers
    hasError: !!(content.newsError || content.moviesError || content.postsError),
    errorMessage: content.newsError || content.moviesError || content.postsError
  };
};
