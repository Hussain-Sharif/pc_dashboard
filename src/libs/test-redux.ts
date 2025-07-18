import { store } from '../store/store';
import { 
  fetchAllContent, 
  setCurrentSection,
  addToFavorites
} from '../store/slices/contentSlice';
import { 
  setCurrentNewsCategory, 
  toggleDarkMode, 
  setSearchQuery 
} from '../store/slices/userPrefsSlice';

// Test Redux Store
export const testReduxStore = async () => {
  console.log('🚀 Testing Redux Store...');
  
  // Test initial state
  console.log('Initial State:', store.getState());
  
  // Test user preferences
  store.dispatch(setCurrentNewsCategory('technology'));
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
    const result = await store.dispatch(fetchAllContent(['technology', 'sports']));
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
