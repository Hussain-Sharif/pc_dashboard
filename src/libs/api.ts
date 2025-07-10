
// lib/api.ts
import { NewsArticle, Movie, SocialPost, NewsApiResponse, TMDBResponse } from './types';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// News API with proper error handling
export const fetchNewsData = async (category: string = 'technology'): Promise<NewsArticle[]> => {
  try {
    if (!NEWS_API_KEY) {
      throw new Error('News API key is missing');
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`News Api error! status: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();
    
    // Filtering out articles with missing images or titles
    return data.articles.filter(article => 
      article.urlToImage && 
      article.title && 
      article.title !== '[Removed]'
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// TMDB API with proper typing
export const fetchMoviesData = async (): Promise<Movie[]> => {
  try {
    if (!TMDB_API_KEY) {
      throw new Error('TMDB API key is missing');
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`,{
        method: 'GET',
        
      }
    );

    if (!response.ok) {
      throw new Error(`Movies TMBD API error! status: ${response.status}`);
    }

    const data: TMDBResponse = await response.json();
    
    // Filter out movies without posters
    return data.results.filter(movie => movie.poster_path);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// JSONPlaceholder API with proper typing
export const fetchPostsData = async (): Promise<SocialPost[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`News API error! status: ${response.status}`);
    }

    const data: SocialPost[] = await response.json();
    
    // Return first 10 posts
    return data.slice(0, 10);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Combined fetch function for all content types
export const fetchAllContent = async (categories: string[] = ['business']) => {
  const promises = [
    fetchNewsData(categories[0] || 'technology'),
    fetchMoviesData(),
    fetchPostsData()
  ];

  try {
    const [news, movies, posts] = await Promise.all(promises);
    return { news, movies, posts };
  } catch (error) {
    console.error('Error fetching all content:', error);
    return { news: [], movies: [], posts: [] };
  }
};
