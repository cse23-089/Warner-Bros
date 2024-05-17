document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    if (movieId) {
        try {
            // Fetch movie details
            const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=237d3b942eae7ff6b4e92b010661502a`);
            const movieData = await movieResponse.json();

            // Fetch movie credits
            const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=237d3b942eae7ff6b4e92b010661502a`);
            const creditsData = await creditsResponse.json();

            // Populate movie details on the page
            document.querySelector('.movie-detail .backdrop-image').style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movieData.backdrop_path}')`;
            document.querySelector('.poster-box img').src = `https://image.tmdb.org/t/p/original${movieData.poster_path}`;
            document.querySelector('.heading').textContent = movieData.title;
            document.querySelector('.rating').textContent = movieData.vote_average;
            document.querySelector('.moviedesc').textContent = ` | Genre: ${movieData.genres.map(genre => genre.name).join(', ')}`;
            document.querySelector('.meta-li').textContent = movieData.release_date.substring(0, 4);
            document.querySelector('.movie-overview').textContent = movieData.overview;

            // Populate actors (starring)
            const actors = creditsData.cast.filter(actor => actor.known_for_department === 'Acting').map(actor => actor.name);
            const limitedActors = limitWords(actors.join(', '), 15); // Limit to 15 words
            document.querySelector('.starring').textContent = limitedActors;

            // Populate director
            const director = creditsData.crew.find(member => member.known_for_department === 'Directing');
            if (director) {
                document.querySelector('.director-name').textContent = director.name;
            }

            // Add event listener to buttons
            document.querySelector('.movie-button').addEventListener('click', function() {
                const movieTitle = movieData.title;
                const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(movieTitle)}&i=instant-video`;
                window.location.href = amazonUrl;
            });

        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    } else {
        console.error('No movie ID found in URL');
    }
});

function limitWords(sentence, limit) {
    const words = sentence.split(' ');
    if (words.length <= limit) {
        return sentence;
    } else {
        const truncatedWords = words.slice(0, limit);
        return truncatedWords.join(' ') + '...';
    }
}
