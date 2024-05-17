const API_KEY = '237d3b942eae7ff6b4e92b010661502a';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMoviesByGenre(genreId) {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await response.json();
  return data.results;
}

