ddocument.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch popular TV shows
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=237d3b942eae7ff6b4e92b010661502a`);
        const data = await response.json();

        // Extract a random TV show from the list
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const series = data.results[randomIndex];

        // Populate TV show details on the page
        document.querySelector('.movie-detail .backdrop-image').style.backgroundImage = `url('https://image.tmdb.org/t/p/original${series.backdrop_path}')`;
        document.querySelector('.poster-box img').src = `https://image.tmdb.org/t/p/original${series.poster_path}`;
        document.querySelector('.heading').textContent = series.name;
        document.querySelector('.rating').textContent = series.vote_average;
        document.querySelector('.moviedesc').textContent = ` | Genre: ${series.genres.map(genre => genre.name).join(', ')}`;
        document.querySelector('.meta-li').textContent = series.first_air_date.substring(0, 4);
        document.querySelector('.movie-overview').textContent = series.overview;
        document.querySelector('.meta-li:nth-child(4)').textContent = `Seasons: ${series.number_of_seasons}`;

        // Fetch TV show credits
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/tv/${series.id}/credits?api_key=237d3b942eae7ff6b4e92b010661502a`);
        const creditsData = await creditsResponse.json();

        // Populate actors (starring)
        const actors = creditsData.cast.filter(actor => actor.known_for_department === 'Acting').map(actor => actor.name);
        const limitedActors = limitWords(actors.join(', '), 15); // Limit to 15 words
        document.querySelector('.starring').textContent = limitedActors;

        // Populate director
        const creator = creditsData.crew.find(member => member.known_for_department === 'Directing');
        if (creator) {
            document.querySelector('.director-name').textContent = creator.name;
        }

        // Add event listener to button
        document.querySelector('.movie-button').addEventListener('click', function() {
            // Action when button is clicked (e.g., rent or buy)
        });

    } catch (error) {
        console.error('Error fetching TV show details:', error);
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

document.addEventListener('DOMContentLoaded', function() {
    const showItems = document.querySelectorAll('.show-list-item');

    showItems.forEach(showItem => {
        showItem.addEventListener('click', async function() {
            const showTitle = showItem.querySelector('.show-list-item-title').textContent;

            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=237d3b942eae7ff6b4e92b010661502a&query=${showTitle}`);
                const data = await response.json();
                
                if (data.results.length > 0) {
                    const show = data.results[0];
                    const showId = show.id;
                    window.location.href = `detail.html?showId=${showId}`; // Change to 'showId'
                } else {
                    console.error('No show found with that title');
                }
            } catch (error) {
                console.error('Error fetching show details:', error);
            }
        });
    });
});
