// lib/types.ts
export interface NewsArticle {
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