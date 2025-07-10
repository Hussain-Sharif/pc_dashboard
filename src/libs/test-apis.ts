// lib/test-apis.ts
import { fetchNewsData, fetchMoviesData, fetchPostsData } from './api';

const testAPIs = async () => {
  console.log('Testing APIs...');
  
  const news = await fetchNewsData();
  console.log('News Articles:', news.length, news[0]);
  
  const movies = await fetchMoviesData();
  console.log('Movies:', movies.length, movies[0]);
  
  const posts = await fetchPostsData();
  console.log('Posts:', posts.length, posts[0]);
};


// testAPIs();

export default testAPIs;