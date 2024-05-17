const genreContainers = document.querySelectorAll('.movie-list-container');

async function appendMoviesToGenreContainers() {
  const actionGenreId = 28; // Action genre ID
  const romanceGenreId = 10749; // Comedy genre ID
  const horrorGenreId = 27;
  

  // Fetch and append movies for each genre
  const movieLists = await Promise.all([
    fetchMoviesByGenre(actionGenreId),
    fetchMoviesByGenre(romanceGenreId),
    fetchMoviesByGenre(horrorGenreId),
   
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