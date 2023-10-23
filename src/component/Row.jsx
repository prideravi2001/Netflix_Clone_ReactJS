import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const base_url_img = 'https://image.tmdb.org/t/p/original';

function Row({title,fetchUrl,isLargeRow}){
  const [movies, setMovies] = useState([]);
  const [trialerUrl, setTrailerUrl] = useState("");
  // A snippet of code which runs based on a sprcific condition/variable
  useEffect(()=>{
    // Fetch the data from the API
    // if [], run once when the row loads, and don't run again
    // if [movies], run once when the movies change
    // if [movies, title], run once when the movies and title change
    // if [movies, title, fetchUrl], run once when the movies, title and fetchUrl change
    async function fetchData(){
      const request = await axios.get(fetchUrl);
      //'https://api.themoviedb.org/3'
      setMovies(request.data.results);
      // console.log(request);
      return request;
    }
    fetchData();
  },[fetchUrl]);
  // fetchUrl we need to add this because it's a dependency and var outside of the block.
  // console.log(movies);

  // For Youtube Trailers
  const opts = {
    height: "390",
    width:"100%",
    playerVars:{
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  const handleClick = (movie) => {
    const url = 'https://www.youtube.com/watch?';
    if (trialerUrl) {
      setTrailerUrl('');
    } else {
         console.log("tmdbId is movie.id  = "+movie.id );
        console.dir("Movie name = "+JSON.stringify(movie));
      // movieTrailer(null ,{ tmdbId: movie.id })
      //  .then((url)=>{
      //    console.log("url is "+url);
      //    const urlParams=new URLSearchParams(new URL(url).search);
      //    console.log("urlParamsn"+urlParams);
      //    setTrailerUrl(urlParams.get("v"));
      //  })
      //  .catch((error)=> console.log(error));
        movieTrailer(movie.title || movie.original_name || movie.name || movie.original_title)
        .then((url) => {
          try {
            if(!url){
              alert("Video Unavailable Please select any other card from the list to see the Trailer.");
            }
            console.log('trialerUrl = ',url,'\n',movie.name);
            const urlObject = new URL(url);
            const urlParams = new URLSearchParams(urlObject.search);
            console.log(`URL = ${url}\nMovieName = ${movie?.name}`);
            setTrailerUrl(urlParams.get('v'));
          } catch (error) {
            console.error("Invalid URL: " + error);
          }
        })
        .catch((error) => console.log("Invalid URL " + error));
    }
  }

  // const handleClick = (movie) => {
  //   if(trialerUrl){
  //     setTrailerUrl('');
  //   } else{
  //     movieTrailer(movie?.name || "")
  //     .then((url) => {
  //       // https://www.youtube.com/watch?v=6_C5-i3nb8w
  //       //                               new URL(url).search
  //       const urlParams = new URLSearchParams(new URL(url).search);
  //       console.log(`url = ${url}\nMovieName = ${(movie?.name)}`);
  //         setTrailerUrl(urlParams.get('v'));
  //     })
  //     .catch((error) => console.log("Invalid URL "+error));
  //   }
  // }
  return(
    <>
      <div className="row">
      <h2>{title}</h2>
      {/* container -> posters */}
        <div className="row__posters">
          {movies.map(movie => {
            // console.log(`${base_url_img}${movie.poster_path}`)
            // console.log("movies = "movie);
            return <img key={movie.id} 
                src={`${base_url_img}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                onClick={()=> handleClick(movie)}
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`} 
                alt={movie.name}/>
          })}
        </div>
        {trialerUrl ? <YouTube videoId={trialerUrl} opts={opts}/> : ''}
      </div>
    </>
  )
}

export default Row;