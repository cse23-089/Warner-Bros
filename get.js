const apiKey = '237d3b942eae7ff6b4e92b010661502a';
const baseURL = 'https://api.themoviedb.org/3';

// Function to fetch movies by genre
async function fetchMoviesByGenre(genreId) {
    const moviesURL = `${baseURL}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
    try {
        const response = await fetch(moviesURL);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Error fetching movies for genre ${genreId}:`, error);
        return [];
    }
}

// Function to display movies by genre
async function displayMoviesByGenre() {
    // Get all genre sections
    const genreSections = document.querySelectorAll('h1');

    // Loop through each genre section
    for (const section of genreSections) {
        const genreName = section.textContent.trim();
        const moviesContainer = section.nextElementSibling;

        // Check if movies container exists
        if (!moviesContainer) {
            console.error(`Movies container not found for genre ${genreName}`);
            continue;
        }

        // Extract genre name from section heading
        const genreId = getGenreIdByName(genreName);

        // Fetch movies for the genre
        const movies = await fetchMoviesByGenre(genreId);
        console.log(`Fetched ${movies.length} movies for genre ${genreName}`);

        // Create list for movies in genre
        const movieList = document.createElement('div');
        movieList.classList.add('movie-list');

        // Loop through each movie in the genre
        movies.forEach(movie => {
            const listItem = document.createElement('div');
            listItem.classList.add('movie-list-item');
            listItem.innerHTML = `
                <img class="movie-list-item-img" src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}">
                <span class="movie-list-item-title">${movie.title}</span>
                <p class="movie-list-item-desc">| Genre: ${genreName}</p>
                <button class="movie-list-item-button">WATCH</button>
            `;
            movieList.appendChild(listItem);
        });

        // Append movie list to movies container
        moviesContainer.appendChild(movieList);
        console.log(`Appended ${movies.length} movies to container for genre ${genreName}`);
    }
}

// Function to get genre ID by name
function getGenreIdByName(genreName) {
    // Map genre names to genre IDs (you can extend this as needed)
    const genreMap = {
        "Action": 28,
        "Thriller": 53,
        "Romance": 10749,
        "Drama": 18,
        "Horror": 27,
        "Science Fiction": 878,
        "Adventure": 12,
        "Animation": 16
        // Add more genres here if needed
    };
    return genreMap[genreName];
}

// Call the function to display movies by genre
displayMoviesByGenre();


// Function to display more movies for a specific genre
async function displayMoreMovies(genreId, genreName) {
    try {
        const response = await fetch(`${API_URL}with_genres=${genreId}&page=${currentPage + 1}`);
        const data = await response.json();

        if (data.results.length > 0) {
            data.results.forEach((movie) => {
                const movieElement = createMovieElement(movie);
                document.querySelector(`#${genreName}-list`).appendChild(movieElement);
            });

            currentPage++;
        } else {
            const moreButton = document.querySelector(`button[data-genre-id="${genreId}"]`);
            if (moreButton) {
                moreButton.remove();
            }
        }
    } catch (error) {
        console.error(`Error fetching more movies for genre ${genreId}:`, error);
    }

    document.querySelectorAll('.more-button').forEach((button) => {
        button.addEventListener('click', async function() {
            const genreId = button.dataset.genreId;
            const genreName = button.dataset.genreName;
            await displayMoreMovies(genreId, genreName);
        });
    });
    
}
