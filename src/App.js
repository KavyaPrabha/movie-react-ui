import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourite from './Components/AddFavourites';
import RemoveFavourites from './Components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([])
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('')

const getMovieRequest = async (searchValue) => {
  const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=e4e1ebaa`;
  const response = await fetch(url);
  const responseJson = await response.json();
  if (responseJson.Search) {
    setMovies(responseJson.Search);
  }
};

const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie]
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
};

const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );
  setFavourites(newFavouriteList)
  saveToLocalStorage(newFavouriteList)
}; 

useEffect(() => {
  getMovieRequest(searchValue);
}, [searchValue]);

useEffect(() => {
  const movieFavourites = JSON.parse(
    localStorage.getItem('react-movie-app-favourites')
  );
  setFavourites(movieFavourites);
}, []);

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favourites',JSON.stringify(items))
};

return (
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading ="Movies" />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
    <div className='d-flex'>
      <MovieList
        movies={movies} 
        handleFavouritesClick={addFavouriteMovie} 
        favouriteComponent={AddFavourite}
      /> 
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading ="Favourites" />
    </div>
    <div className='d-flex'>
      <MovieList
        movies={favourites} 
        handleFavouritesClick={removeFavouriteMovie} 
        favouriteComponent={RemoveFavourites}
      /> 
    </div>
  </div>
);
}

export default App;
