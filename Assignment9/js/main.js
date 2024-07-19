var movies;

const API_Key = "f2b59963881f67e8d8dbe04a25ebf9f6";
const nowPlayingMoviesURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_Key}`;
const popularMoviesURL  = `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}`;
const topRatedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_Key}`;
const trendingMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_Key}`;
const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_Key}`;


var controlMenu = document.querySelector("#control-menu");
var Menu = document.querySelector("#menu");
var menuList = document.querySelector(".menu-list");
var verticalNavbar = document.querySelector("#vertical-navbar");

var mainTitle = document.querySelector("#main-title");

var searchInput = document.querySelector("#search-input");
const baseUrl = 'https://api.themoviedb.org/3';
const getMovies = '/movie/now_playing';

var allMoviesContainer = document.querySelector("#movie-container");

var apiButton1 = document.querySelector("#m-btn-1");
var apiButton2 = document.querySelector("#m-btn-2");
var apiButton3 = document.querySelector("#m-btn-3");
var apiButton4 = document.querySelector("#m-btn-4");
var apiButton5 = document.querySelector("#m-btn-5");


getApi(nowPlayingMoviesURL);


controlMenu.onclick = function(){
    if(Menu.style.left=='-100%'){
        Menu.style.left='0';
        verticalNavbar.style.left='12%';
    }
    else{
        Menu.style.left='-100%';
        verticalNavbar.style.left='0%';
    }
}


apiButton1.setAttribute('onclick', 
    `getApi('${nowPlayingMoviesURL}');
    document.querySelector("#main-title").innerHTML = 'Now Playing';`);
apiButton2.setAttribute('onclick', 
    `getApi('${popularMoviesURL}');
    document.querySelector("#main-title").innerHTML = 'Popular Movies';`);
apiButton3.setAttribute('onclick', 
    `getApi('${topRatedMoviesURL}'); 
    document.querySelector("#main-title").innerHTML = 'Top Rated Movies';`);
apiButton4.setAttribute('onclick', 
    `getApi('${trendingMoviesURL}');    
    document.querySelector("#main-title").innerHTML = 'Trending Movies';`);
apiButton5.setAttribute('onclick', 
    `getApi('${upcomingMoviesURL}'); 
    document.querySelector("#main-title").innerHTML = 'Upcoming Movies';`);

async function getApi(option) {
    try {
        movies = await getMoviesData(option);
        displaylMoviesData(movies.results);
    } catch (error) {
        console.error(error);
    }
}

async function getMoviesData(option) {
    
    var response = await fetch(option);
    if (!response.ok) {
        throw new Error("Could Not Fetch resipes data");
    }
    var data= await response.json();
    return data;
} 


function displaylMoviesData(movies) {
    allMoviesContainer.innerHTML = ''; 
    for (let i = 0; i < movies.length; i++) {
        var movie = movies[i];
        var movieContainer = document.createElement('div');
    
        var mainImg = document.createElement('img');

        var movieDetailsContainer = document.createElement('div');
        var secImg = document.createElement('img');
        var movieTitle = document.createElement('h4');
        var movieDescription = document.createElement('p');
        var movieRating = document.createElement('p');
        var movieDate = document.createElement('p');
        var moviePlay = document.createElement('button');

        movieContainer.classList.add('col-md-4', 'mb-4', 'movie-item');
        movieContainer.id = movie.id;

        movieDetailsContainer.classList.add('movie-details');
        movieTitle.classList.add("mt-3");
        moviePlay.classList.add('play-button');

        secImg.classList.add("w-75");

        //Main Image
        mainImg.src = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
        mainImg.classList.add('w-100');
        mainImg.alt = movie.original_title;
        
        // Inner Div (Movie Detail Container)
        secImg.src= 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;

        movieTitle.textContent = movie.original_title;
        movieDescription.textContent = movie.overview;
        movieRating.textContent = movie.vote_average;
        movieDate.textContent = movie.release_date;
        
        movieDetailsContainer.append(secImg, movieTitle, movieDescription, movieRating, movieDate, moviePlay);

        movieContainer.append(mainImg, movieDetailsContainer);
    
        allMoviesContainer.appendChild(movieContainer);
    }
}


searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
        const searchUrl = `${baseUrl}/search/movie?api_key=${API_Key}&query=${query}`;
        mainTitle.innerHTML = `Results for "${query}"`;
        getApi(searchUrl);
    }
    else {
        mainTitle.innerHTML = `New playing`;
        getApi(`${baseUrl}${getMovies}?api_key=${API_Key}`);
    }
});
