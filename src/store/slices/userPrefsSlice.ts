import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../libs/types';

interface UserPrefsState {
  // News categories
  selectedCategories: Category[];
  
  // UI preferences
  darkMode: boolean;
  
  // Layout preferences
  cardLayout: 'grid' | 'list';
  cardsPerRow: 2 | 3 | 4;
  
  // Search
  searchQuery: string;
  
  // Pagination
  itemsPerPage: number;
}

const initialState: UserPrefsState = {
  selectedCategories: ['technology'],
  darkMode: false,
  cardLayout: 'grid',
  cardsPerRow: 3,
  searchQuery: '',
  itemsPerPage: 20,
};

const userPrefsSlice = createSlice({
  name: 'userPrefs',
  initialState,
  reducers: {
    // Category management
    setSelectedCategories: (state, action: PayloadAction<Category[]>) => {
      state.selectedCategories = action.payload;
    },
    
    addCategory: (state, action: PayloadAction<Category>) => {
      if (!state.selectedCategories.includes(action.payload)) {
        state.selectedCategories.push(action.payload);
      }
    },
    
    removeCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategories = state.selectedCategories.filter(
        cat => cat !== action.payload
      );
    },
    
    // UI preferences
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
       if (typeof window !== 'undefined') {
        if (state.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        // ✅ Persist to localStorage
       localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
       }
    },
    // ✅ Add initialization from localStorage
    setDarkModeFromStorage: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      if (typeof window !== 'undefined') {
        if (action.payload) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    
    // setDarkMode: (state, action: PayloadAction<boolean>) => {
    //   state.darkMode = action.payload;
    // },
    
    // Layout preferences
    setCardLayout: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.cardLayout = action.payload;
    },
    
    setCardsPerRow: (state, action: PayloadAction<2 | 3 | 4>) => {
      state.cardsPerRow = action.payload;
    },
    
    // Search
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    
    // Pagination
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    
    // Reset to defaults
    resetPreferences: () => {
      return initialState;
    },
  },
});

export const {
  setSelectedCategories,
  addCategory,
  removeCategory,
  toggleDarkMode,
  setDarkModeFromStorage,
  // setDarkMode,
  setCardLayout,
  setCardsPerRow,
  setSearchQuery,
  setItemsPerPage,
  resetPreferences
} = userPrefsSlice.actions;

export default userPrefsSlice.reducer;
