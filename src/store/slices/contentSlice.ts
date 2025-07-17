import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle, Movie, SocialPost, ApiSituation, UnifiedCardData } from '../../libs/types';
import { fetchNewsData, fetchMoviesData, fetchPostsData } from '../../libs/api';
import { mapMovieToUnified, mapNewsToUnified, mapPostToUnified } from '@/libs/mappers';

// Async thunks for API calls
export const fetchNews = createAsyncThunk(
  'content/fetchNews',
  async (category: string[] = ['technology']) => {
    const news = await fetchNewsData(category);
    return news;
  }
);

export const fetchMovies = createAsyncThunk(
  'content/fetchMovies',
  async () => {
    const movies = await fetchMoviesData();
    return movies;
  }
);

export const fetchPosts = createAsyncThunk(
  'content/fetchPosts',
  async () => {
    const posts = await fetchPostsData();
    return posts;
  }
);

export const fetchAllContent = createAsyncThunk(
  'content/fetchAllContent',
  async (category: string[] =[ 'technology']) => {
    const [news, movies, posts] = await Promise.all([
      fetchNewsData(category),
      fetchMoviesData(),
      fetchPostsData()
    ]);
    return { news, movies, posts };
  }
);

// Content state interface
export interface ContentState {
  unifiedContent : UnifiedCardData[];
  // Data
  personalizedNews: NewsArticle[];
  trendingNews: NewsArticle[];
  movies: Movie[];
  posts: SocialPost[];
  
  // Favorites
  favoriteNews: NewsArticle[];
  favoriteMovies: Movie[];
  favoritePosts: SocialPost[];
  
  // Loading states
  newsLoading: boolean;
  moviesLoading: boolean;
  postsLoading: boolean;
  allContentLoading: boolean;

  // Api Situation state
  currentAllContentSituation: ApiSituation;
  
  // Error states
  newsError: string | null;
  moviesError: string | null;
  postsError: string | null;
  
  // Current section
  currentSection: 'personalized' | 'trending' | 'favorites';
}

const initialState: ContentState = {
  unifiedContent : [],
  personalizedNews: [],
  trendingNews: [],
  movies: [],
  posts: [],

  favoriteNews: [],
  favoriteMovies: [],
  favoritePosts: [],

  newsLoading: false,
  moviesLoading: false,
  postsLoading: false,
  allContentLoading: false,

  currentAllContentSituation:'initial',

  newsError: null,
  moviesError: null,
  postsError: null,

  currentSection: 'personalized',
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    // Section switching
    setCurrentSection: (state, action: PayloadAction<'personalized' | 'trending' | 'favorites'>) => {
      state.currentSection = action.payload;
    },
    
    // Favorites management
    addToFavorites: (state, action: PayloadAction<{type: 'news' | 'movie' | 'post', item: any}>) => {
      const { type, item } = action.payload;
      
      switch (type) {
        case 'news':
          const existingNews = state.favoriteNews.find(n => n.url === item.url);
          if (!existingNews) {
            state.favoriteNews.push(item);
          }
          break;
        case 'movie':
          const existingMovie = state.favoriteMovies.find(m => m.id === item.id);
          if (!existingMovie) {
            state.favoriteMovies.push(item);
          }
          break;
        case 'post':
          const existingPost = state.favoritePosts.find(p => p.id === item.id);
          if (!existingPost) {
            state.favoritePosts.push(item);
          }
          break;
      }
    },
    
    removeFromFavorites: (state, action: PayloadAction<{type: 'news' | 'movie' | 'post', id: string | number}>) => {
      const { type, id } = action.payload;
      
      switch (type) {
        case 'news':
          state.favoriteNews = state.favoriteNews.filter(n => n.url !== id);
          break;
        case 'movie':
          state.favoriteMovies = state.favoriteMovies.filter(m => m.id !== id);
          break;
        case 'post':
          state.favoritePosts = state.favoritePosts.filter(p => p.id !== id);
          break;
      }
    },
    
    // Drag and drop reordering
    reorderContent: (state, action: PayloadAction<{section: string, type: string, startIndex: number, endIndex: number}>) => {
      const { section, type, startIndex, endIndex } = action.payload;
      
      let items: any[] = [];
      
      if (section === 'favorites') {
        switch (type) {
          case 'news':
            items = state.favoriteNews;
            break;
          case 'movie':
            items = state.favoriteMovies;
            break;
          case 'post':
            items = state.favoritePosts;
            break;
        }
      } else if (section === 'personalized' && type === 'news') {
        items = state.personalizedNews;
      } else if (section === 'trending' && type === 'news') {
        items = state.trendingNews;
      }
      
      if (items.length > 0) {
        const [reorderedItem] = items.splice(startIndex, 1);
        items.splice(endIndex, 0, reorderedItem);
      }
    },
    
    // Clear errors
    clearErrors: (state) => {
      state.newsError = null;
      state.moviesError = null;
      state.postsError = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch News
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsLoading = true;
        state.newsError = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsLoading = false;
        state.personalizedNews = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.newsLoading = false;
        state.newsError = action.error.message || 'Failed to fetch news';
      });
    
    // Fetch Movies
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.moviesLoading = true;
        state.moviesError = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.moviesLoading = false;
        state.moviesError = action.error.message || 'Failed to fetch movies';
      });
    
    // Fetch Posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsLoading = true;
        state.postsError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.postsLoading = false;
        state.postsError = action.error.message || 'Failed to fetch posts';
      });
    
    // Fetch All Content
    builder
      .addCase(fetchAllContent.pending, (state) => {
        state.allContentLoading = true;
        state.newsError = null;
        state.moviesError = null;
        state.postsError = null;
        state.currentAllContentSituation='loading'
      })
      .addCase(fetchAllContent.fulfilled, (state, action) => {
        state.allContentLoading = false;
        state.personalizedNews = action.payload.news;
        state.trendingNews = action.payload.news; // For now, same as personalized
        state.movies = action.payload.movies;
        state.posts = action.payload.posts;
        state.currentAllContentSituation='success'

        const mappedNews = action.payload.news.map(mapNewsToUnified);
        const mappedMovies = action.payload.movies.map(mapMovieToUnified);
        const mappedPosts = action.payload.posts.map(mapPostToUnified);

        // Now you have a consistent array of all your content!
        const allContent = [...mappedNews, ...mappedMovies, ...mappedPosts];

        // You can sort them all by timestamp to create a true chronological feed
        allContent.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        state.unifiedContent = allContent;
      })
      .addCase(fetchAllContent.rejected, (state, action) => {
        state.allContentLoading = false;
        state.currentAllContentSituation='error'
        state.newsError = action.error.message || 'Failed to fetch content'; // rather than having another state I shooe to this state and we are commonly showing the errors based on any error comes 
      });
  },
});

export const {
  setCurrentSection,
  addToFavorites,
  removeFromFavorites,
  reorderContent,
  clearErrors
} = contentSlice.actions;

export default contentSlice.reducer;
