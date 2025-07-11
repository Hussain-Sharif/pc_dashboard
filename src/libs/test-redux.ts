import { store } from '../store/store';
import { 
  fetchAllContent, 
  fetchNews, 
  fetchMovies, 
  fetchPosts,
  setCurrentSection,
  addToFavorites
} from '../store/slices/contentSlice';
import { 
  setSelectedCategories, 
  toggleDarkMode, 
  setSearchQuery 
} from '../store/slices/userPrefsSlice';

// Test Redux Store
export const testReduxStore = async () => {
  console.log('🚀 Testing Redux Store...');
  
  // Test initial state
  console.log('Initial State:', store.getState());
  
  // Test user preferences
  store.dispatch(setSelectedCategories(['technology', 'sports']));
  store.dispatch(toggleDarkMode());
  store.dispatch(setSearchQuery('React'));
  
  console.log('After User Prefs Update:', store.getState().userPrefs);
  
  // Test content actions
  store.dispatch(setCurrentSection('trending'));
  console.log('Current Section:', store.getState().content.currentSection);
  
  // Test async thunks
  console.log('📡 Fetching content...');
  
  try {
    // Fetch all content
    const result = await store.dispatch(fetchAllContent('technology'));
    console.log('Fetch All Content Result:', result);
    
    // Check state after fetch
    const state = store.getState().content;
    console.log('News Count:', state.personalizedNews.length);
    console.log('Movies Count:', state.movies.length);
    console.log('Posts Count:', state.posts.length);
    
    // Test favorites
    if (state.personalizedNews.length > 0) {
      store.dispatch(addToFavorites({
        type: 'news',
        item: state.personalizedNews[0]
      }));
      console.log('Added to favorites:', store.getState().content.favoriteNews.length);
    }
    
  } catch (error) {
    console.error('❌ Error testing Redux:', error);
  }
};

// Test individual API calls
export const testIndividualFetches = async () => {
  console.log('🔄 Testing Individual API Calls...');
  
  try {
    // Test news fetch
    const newsResult = await store.dispatch(fetchNews('technology'));
    console.log('News fetch:', newsResult);
    
    // Test movies fetch
    const moviesResult = await store.dispatch(fetchMovies());
    console.log('Movies fetch:', moviesResult);
    
    // Test posts fetch
    const postsResult = await store.dispatch(fetchPosts());
    console.log('Posts fetch:', postsResult);
    
  } catch (error) {
    console.error('❌ Error in individual fetches:', error);
  }
};
