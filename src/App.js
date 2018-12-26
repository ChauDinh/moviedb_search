import React, { Component } from 'react';
import './App.css';
import MovieRow from './movieRow.js';
import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props);
    console.log("This is my initializer");
    this.state = {};

    // const movies = [
    //   {
    //     id: 0, title: "Avangers", overview: "This is my first overview", 
    //     poster_src: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
    //   },
    //   {
    //     id: 1, title: "Wonder Woman", overview: "This is my second overview",
    //     poster_src: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg"
    //   },
    //   {
    //     id: 2, title: "The man from Earth", overview: "This is my third overview",
    //     poster_src: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/zYP2lBJ5GRV1HaIi4USqRl3phe.jpg"
    //   }
    // ];

    // var movieRows = [];
    // movies.forEach((movie) => {
    //   console.log(movie.overview);
    //   const movieRow = <MovieRow movie={movie} key={movie.id}/>;
    //   movieRows.push(movieRow);
    // })

    // this.state = {rows: movieRows};

    this.performSearch("avengers");

  }

  performSearch(searchTerm) {
    console.log("Perform search using movieDB");
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=c354c364074f2ca770427a133f6b9185&query="+searchTerm;
    $.ajax({
      url: urlString, 
      success: (searchResults) => {
        console.log("Fetch data successfully");
        console.log(searchResults);

        const results = searchResults.results;
        var movieRows = [];
        results.forEach(movie => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          const movieRow = <MovieRow movie={movie} key={movie.id}/>
          movieRows.push(movieRow);
        });

        this.setState({rows: movieRows});
      },
      error: (xhr, status, err) => {
        console.log("Error and failed to fetch data");
      }
    })
  }

  searchChangeHandler(event) {
    const boundObject = this;
    boundObject.performSearch(event.target.value);
    // We will talk about "bind" and "this" more details on my blog Amanlearnscode
  }

  render() {
    return (
      <div className="main-container">
        <table className="navbar">
          <tbody>
            <tr>
              <td>
                <a href="#" className="button">
                  <svg width="30" height="30">
                    <path d="M0,5 30,5" stroke="#fff" strokeWidth="5"/>
                    <path d="M0,14 30,14" stroke="#fff" strokeWidth="5"/>
                    <path d="M0,23 30,23" stroke="#fff" strokeWidth="5"/>
                  </svg>
                </a>
              </td>
              <td width="8" />
              <td>
                <img alt="app_icon" src="../primary-green.svg" width="50%" height="50%" />
              </td>
              <td width="8" />
              <td>
                <input 
                className="search-term"
                onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="wrapper" id="main">
          {this.state.rows}
        </div>  
      </div>
    );
  }
}

export default App;
