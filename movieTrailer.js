document.addEventListener('DOMContentLoaded', async function() {
    // Get the movie title from the DOM
    const movieTitleElement = document.querySelector('.movie-list-item-title');
    const movieTitle = movieTitleElement.textContent;

    try {
        // Fetch the movie ID using the movie title
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=237d3b942eae7ff6b4e92b010661502a&query=${movieTitle}`);
        const data = await response.json();

        // Check if any movies were found
        if (data.results.length > 0) {
            const movieId = data.results[0].id;

            // Fetch thumbnails and trailers for the movie using its ID
            const trailersResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=237d3b942eae7ff6b4e92b010661502a`);
            const trailersData = await trailersResponse.json();

            // Display thumbnails in the existing container as flex items
            const thumbnailsContainer = document.querySelector('.movie-list-wrapper .movie-list');
            trailersData.results.forEach(trailer => {
                const thumbnailUrl = `https://img.youtube.com/vi/${trailer.key}/0.jpg`;
                const trailerThumbnail = document.createElement('div');
                trailerThumbnail.classList.add('movie-list-item');
                trailerThumbnail.innerHTML = `
                    <img class="movie-list-item-img" src="${thumbnailUrl}" alt="Thumbnail">
                    
                        <i class="fa-regular fa-circle-play playbtn"></i> 
                    
                `;
                // Add click event listener to play the trailer when thumbnail is clicked
                trailerThumbnail.addEventListener('click', function() {
                    const videoUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
                    // Open the video in a modal or another section of the page
                    // Example: window.open(videoUrl, '_blank');
                    // Replace '_blank' with the ID or class of the modal element
                });
                thumbnailsContainer.appendChild(trailerThumbnail);
                console.log('Playing trailer:', videoUrl);
            });
        } else {
            console.error('No movie found with that title');
        }
    } catch (error) {
        console.error('Error fetching movie trailers:', error);
    }

    const playButtons = document.querySelectorAll('.playbtn');
    playButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Get the trailer key from the data attribute
            const trailerKey = event.currentTarget.dataset.trailerKey;
            playTrailer(trailerKey);
        });
});
});
