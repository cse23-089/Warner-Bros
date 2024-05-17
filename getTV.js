document.addEventListener('DOMContentLoaded', async () => {
    const genreContainers = document.querySelectorAll('.movie-list-container');
  
    async function fetchMoviesByGenre(genreId) {
      const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=237d3b942eae7ff6b4e92b010661502a&with_genres=${genreId}`);
      const data = await response.json();
      return data.results;
    }
  
    async function appendMoviesToGenreContainers() {
        const comedyGenreId = 35; // Comedy genre ID
      const actionGenreId = 28; // Action genre ID
      
  
      // Fetch and append movies for each genre
      const movieLists = await Promise.all([
        fetchMoviesByGenre(comedyGenreId),
        fetchMoviesByGenre(actionGenreId),
        
      ]);
  
      movieLists.forEach((movies, index) => {
        genreContainers[index].querySelector('.movie-list').innerHTML = '';
  
        movies.forEach(movie => {
          const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'Unknown';
  
          const movieListItem = `
            <div class="movie-list-item">
              <img class="movie-list-item-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="image">
              <span class="movie-list-item-title" id="data-movie-id">${movie.title}</span>
              <p class="movie-list-item-desc"> | Genre: ${genres}</p>
              <button class="movie-list-item-button">WATCH</button>
            </div>
          `;
  
          genreContainers[index].querySelector('.movie-list').insertAdjacentHTML('beforeend', movieListItem);
        });
      });
    }
  
    appendMoviesToGenreContainers();
  });