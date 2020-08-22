import React from "react";
import "./styles.css";
import SearchMovies from "./SearchMovies";
const appTitle = '🍿Binger'
export default class App extends React.Component {
  render() {
    return (
    <div className="container">
      <h1 className='title'>{appTitle}</h1>
      <SearchMovies />
    </div>
  );
  }
}