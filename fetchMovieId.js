function fetchTrailers(movieId) {
    const apiKey = '237d3b942eae7ff6b4e92b010661502a';
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const movieTrailersContainer = document.getElementById('movieTrailers');
        movieTrailersContainer.innerHTML = '';
  
        data.results.filter(video => video.type === 'Trailer' || video.type === 'Teaser').slice(0, 4).forEach(video => {
          const movieTrailerItem = document.createElement('div');
          movieTrailerItem.classList.add('movie-list-item');
  
          const movieTrailerImg = document.createElement('img');
          movieTrailerImg.classList.add('movie-list-item-img');
          movieTrailerImg.src = `https://img.youtube.com/vi/${video.key}/0.jpg`;
  
          const movieTrailerTitle = document.createElement('span');
          movieTrailerTitle.classList.add('movie-list-item-title');
          movieTrailerTitle.textContent = video.name;
  
          movieTrailerItem.appendChild(movieTrailerImg);
          movieTrailerItem.appendChild(movieTrailerTitle);
  
        const playBtn = document.createElement('a');
          playBtn.classList.add('playbtn');
          playBtn.href = `https://www.youtube.com/watch?v=${video.key}`;
          playBtn.target = '_blank';
          playBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  
          movieTrailerItem.appendChild(playBtn);
  
          movieTrailersContainer.appendChild(movieTrailerItem);
        });
      })
      .catch(error => {
        console.error('Error fetching trailers:', error);
      });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
  
    if (movieId) {
      fetchTrailers(movieId);
    }
  });