// lib/types.ts
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author?: string;
  content?: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  original_language: string;
}

export interface SocialPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ApiResponse<T> {
  data: T[];
  error?: string;
}

export interface NewsApiResponse {
  articles: NewsArticle[];
  status: string;
  totalResults: number;
}

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type ContentType = 'news' | 'movie' | 'post';
export type Category = 'technology' | 'sports' | 'business' | 'health' | 'entertainment';

export type ApiSituation = 'initial' | 'loading' | 'success' | 'error';

// Add this new interface
export interface UnifiedCardData {
  id: string; // A unique ID for React keys
  type: 'news' | 'movie' | 'post'; // To know the content type
  title: string;
  description: string;
  imageUrl?: string; // Optional image
  sourceName?: string; // e.g., "CNN" or "TMDB"
  authorName?: string;
  authorImageUrl?: string; // For user avatars
  timestamp: string; // An ISO date string for sorting
  callToActionUrl: string; // The link for the card to open
  metaPrimary?: string; // movie-rating, news-localDate for publication of news
  metaSecondary?: string; // movie-original_language, news-sourceName
}

export type FilterOptions='shuffle' | 'news' | 'movies' | 'posts';