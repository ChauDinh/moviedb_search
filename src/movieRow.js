import React from 'react';
import './App.css';

class MovieRow extends React.Component {
    render() {
        return <div>
                <img src={this.props.movie.poster_src} alt="poster" width="185" height="230" className="poster" /> 
                <br />
                <h2>{this.props.movie.title}</h2>
                <p>{this.props.movie.overview}</p>
            </div>
    }
}

export default MovieRow