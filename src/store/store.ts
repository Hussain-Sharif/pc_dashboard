import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import contentReducer from './slices/contentSlice';
import userPrefsReducer from './slices/userPrefsSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer, // Responsible to Handle COntent of News, movies, posts & favorite section things
    userPrefs: userPrefsReducer, // Responsible to Handle User Preferences, Dark mode part, User settings
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
