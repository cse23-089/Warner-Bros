document.addEventListener('DOMContentLoaded', function() {
    const movieItems = document.querySelectorAll('.movie-list-item');

    movieItems.forEach(movieItem => {
        movieItem.addEventListener('click', async function() {
            const movieTitle = movieItem.querySelector('.movie-list-item-title').textContent;
            const movieGenre = movieItem.querySelector('.movie-list-item-desc').textContent;

            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=237d3b942eae7ff6b4e92b010661502a&query=${movieTitle}`);
                const data = await response.json();
                
                if (data.results.length > 0) {
                    const movie = data.results[0];
                    const movieId = movie.id;
                    window.location.href = `detail.html?movieId=${movieId}`;
                } else {
                    console.error('No movie found with that title');
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        });
    });
});