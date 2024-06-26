const form = document.querySelector('form');
const input = document.querySelector('input');

// clear placeholder text on click
input.addEventListener("focus", function() {
  this.removeAttribute("placeholder");
});

// not a movie
const warning = document.createElement('div');
warning.classList.add('warning');
const text = document.createElement('p');
text.classList.add('warning-text');
const main = document.querySelector('main');
warning.appendChild(text);

// movie
const movie = document.createElement('div');
movie.classList.add('movie')
main.appendChild(movie);

// form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getMovies();
})

function getMovies() {
  const search = input.value;

  fetch('/movies?search=' + search)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then((dataObj) => {
      const data = dataObj.data;
      const { Title, Year, imdbID, Director, Writer, Actors, Plot, Ratings, Type, Poster, Runtime, Genre, Rated, Language } = data;

      if (Type !== "movie") {
        movie.innerHTML = '';
        main.appendChild(warning);
        text.innerHTML = `No movie found with the title of <b>'${search}'</b>. Please search again.`;
      }

      if (Type === "movie") {
        text.textContent = '';
        movie.innerHTML = `<div class="movie-header">
          <h1 id="title">
            <a href="https://www.imdb.com/title/${imdbID}/" target="_blank" rel="noopener noreferrer">${Title}</a>
          </h1>
          <p id="year">(${Year})</p> 
        </div>`;

        movie.innerHTML += `<div class="movie-ratings">
          <div>
            <div class="ratings-heading">
              <p id="imdb">IMDB</p>
            </div>
            <div class="ratings-item">
              <p id="rating1"> - </p>
            </div>
          </div>
          <div>
            <div class="ratings-heading">
              <p id="rotten_tomatoes">Rotten Tomatoes</p>
            </div>
            <div class="ratings-item">
              <p id="rating2"> - </p>
            </div>
          </div>
          <div>
            <div class="ratings-heading">
              <p id="metacritic">Metacrtic</p>
            </div>
            <div class="ratings-item">
              <p id="rating3"> - </p>
            </div>
          </div>
        </div>`;

        movie.innerHTML += `<div class="movie-details">
          <div class="poster">
            <img src="${Poster}">
          </div>

          <div class="detailsContainer">
            <div class="details-heading">
              <p id="label_director">Director:</p>
            </div>
            <div class="detail-item">
              <p id="director">${Director}</p>
            </div>

            <div class="details-heading">
              <p id="label_writer">Writer(s):</p>
            </div>
            <div class="detail-item">
              <p id="writer">${Writer}</p>
            </div>

            <div class="details-heading">
              <p id="label_actors">Starring:</p>
            </div>
            <div class="detail-item">
              <p id="actors">${Actors}</p>
            </div>

            <div class="details-heading">
              <p id="label_plot">Plot:</p>
            </div>
            <div class="detail-item">
              <p id="plot">${Plot}</p>
            </div>
            <span class="keyword">${Runtime}</span>
            <span class="keyword">Rated ${Rated}</span>
            <span class="keyword">${Language}</span>
            <span class="keyword">${Genre}</span>
          </div>
        </div>`;

        const rating1 = document.querySelector('#rating1');
        const rating2 = document.querySelector('#rating2');
        const rating3 = document.querySelector('#rating3');

        // update rating if there is a value
        if (Ratings[0] !== undefined) {
          rating1.textContent = Ratings[0].Value;
        } 
        if (Ratings[1] !== undefined) {
          rating2.textContent = Ratings[1].Value;
        } 
        if (Ratings[2] !== undefined) {
          rating3.textContent = Ratings[2].Value;
        }   
      } 
    })
    .catch((error) => {

      // console.error('Error:', error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'There was a problem. Please try again later.';
      // Assuming 'errorContainer' is a div in your HTML where you want to display the error message
      const errorContainer = document.getElementById('errorContainer'); 
      errorContainer.appendChild(errorMessage);
    });
}
