import { NewsArticle, Movie, SocialPost, UnifiedCardData } from './types';

export const mapNewsToUnified = (article: NewsArticle): UnifiedCardData => ({
  id: article.id,
  type: 'news',
  title: article.title,
  description: article.description || 'No description available.',
  imageUrl: article.urlToImage,
  sourceName: article.source.name,
  authorName: article.author,
  timestamp: article.publishedAt,
  callToActionUrl: article.url,
  metaPrimary: `Published on ${new Date(article.publishedAt).toLocaleDateString()}`,
  metaSecondary: article.source.name,
});

export const mapMovieToUnified = (movie: Movie): UnifiedCardData => ({
  id: String(movie.id),
  type: 'movie',
  title: movie.title,
  description: movie.overview,
  imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  sourceName: 'TMDB',
  timestamp: movie.release_date,
  callToActionUrl: `https://www.themoviedb.org/movie/${movie.id}`,
  metaPrimary: `${movie.vote_average.toFixed(1)} / 10`,
  metaSecondary: movie.original_language.toUpperCase(),
});

export const mapPostToUnified = (post: SocialPost): UnifiedCardData => ({
  id: String(post.id),
  type: 'post',
  title: post.title,
  description: post.body,
  authorName: `User ${post.userId}`,
  // A fun trick to get unique avatars for mock users
  authorImageUrl: `https://i.pravatar.cc/40?u=${post.userId}`,
  timestamp: new Date().toISOString(), // JSONPlaceholder doesn't provide a date
  callToActionUrl: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
  metaPrimary: `From User ${post.userId}`,
});
