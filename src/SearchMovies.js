import React, { useState } from "react";
import MovieCard from "./MovieCard";
import * as styles from './styles.js'

const noResults = "⚠️ There are no movies to display ⚠️";
export default function SearchMovies() {
  const [query, setQuery] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1)
  const url = `https://api.themoviedb.org/3/search/movie?api_key=4e01aee1f0e35dd53596b9895362f9e9&language=en-US&page=1&include_adult=false&query=${query}`;
  const newUrl = `https://api.themoviedb.org/3/search/movie?api_key=4e01aee1f0e35dd53596b9895362f9e9&language=en-US&page=${page}&include_adult=false&query=${query}`;
  const prevUrl = `https://api.themoviedb.org/3/search/movie?api_key=4e01aee1f0e35dd53596b9895362f9e9&language=en-US&page=${page - 1}&include_adult=false&query=${query}`;
  const inputStyleDecider = error ? styles.errorInputStyle : styles.normalInputStyle;
  const length = movies.length;
  const pgBtnStyleDecider = length > 0 ? styles.normalPgButtonStyle : styles.invalidPgButtonStyle

  async function setNewPage() {
    setPage(page + 1)
    console.log('btn pg no.', page,)
    try {
      const newRes = await fetch(newUrl)
      const newData = await newRes.json()
      const newFilteredData = 
      newData.results && newData.results.filter((movie) => movie.poster_path);
      setMovies(newFilteredData || []);
    } catch (err) {
      setError(err);
    }
  }

async function setPreviousPage() {
  setPage(page - 1)
  console.log('btn pg no.', page,)
  try {
    const prevRes = await fetch(prevUrl)
    const prevData = await prevRes.json()
    const prevFilteredData = 
    prevData.results && prevData.results.filter((movie) => movie.poster_path);
    setMovies(prevFilteredData || []);
  } catch (err) {
    setError(err);
  }
}

  function handleChange(e) {
    setQuery(e.target.value);
  }

  const renderMovies = () =>
    movies.map((movie) => <MovieCard movie={movie} key={movie.id} />);

  async function searchMovies(e) {
    e.preventDefault();
    if (!query) setError("Please Enter A Keyword");
    else
      try {
        const res = await fetch(url);
        const data = await res.json();
        const filteredData =
          data.results && data.results.filter((movie) => movie.poster_path);
        setMovies(filteredData || []);
        setError('')
        setPage(2)
      } catch (err) {
        setError(err);
      }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label"></label>
        <input
          autoComplete="off"
          value={query}
          onChange={handleChange}
          className='input'
          style={inputStyleDecider}
          type="text"
          placeholder="Search Movies"
          name="query"
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {error && <div className="err">{error}</div>}
      {!length && <div className="no-results">{noResults}</div>}
      <div className="card-list">{renderMovies()}</div>
      <div className='pg-no'>
        <button onClick={setPreviousPage} style={pgBtnStyleDecider}>Previous Page</button>
        <button onClick={setNewPage} style={pgBtnStyleDecider}>Next Page</button>
      </div>
    </>
  );
}
