import React from "react";
import "./styles.css";
import SearchMovies from "./SearchMovies";

const appTitle = '🍿Binger'
const imgStyle = {
  'width': '40%',
  'margin': '0 auto'
}


export default class App extends React.Component {
  render() {
    return (
    <div className="container">
      <img style={imgStyle} src='https://bit.ly/3aPx2gv' alt='TMDB LOGO'></img>
      <h1 className='title'>{appTitle}</h1>
      <SearchMovies />
    </div>
  );
  }
}