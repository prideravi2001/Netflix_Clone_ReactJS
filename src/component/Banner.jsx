import React, {useState, useEffect} from 'react';
import axios from '../axios';
import requests from '../requests';
import './Banner.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Banner(){
  const [movie,setMovie] = useState([]);
  const [trialerUrl,setTrailerUrl] = useState('');
  useEffect(()=>{
    // async function fetchData(){
    //   const request = await axios.get(requests.fetchNeftlixOriginals); // spelling mistake
    //   console.log("adf ",request)
    //   // setMovie(
    //   //   request.data.results[
    //   //     Math.floor(Math.random() * request.data.results.length - 1)
    //   //   ]  
    //   // );
    //   // return request;
    // }
    //   fetchData();

    async function fetchData(){
      const request = await axios.get(requests.fetchNetflixOriginals);
      //'https://api.themoviedb.org/3'
      setMovie(request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ]);
      return request;
    }
    fetchData();
  },[]);
  
  console.log(movie)


  const handleClick = (movie) =>{
    if (trialerUrl) {
      setTrailerUrl('');
    } else {
        console.log("tmdbId is movie.id  = "+movie.id );
        console.dir("Movie name = "+JSON.stringify(movie));
      movieTrailer(null ,{ tmdbId: movie.id })
       .then((url)=>{
         console.log("url is "+url);
         if(!url){
            alert("Video Unavailable Please reload the page or select any other card from below list.");
          }
         const urlParams=new URLSearchParams(new URL(url).search);
         console.log("urlParamsn"+urlParams);
         setTrailerUrl(urlParams.get("v"));
       })
       .catch((error)=> console.log(error));
    }
  }
  const opts = {
    height: "390",
    width:"100%",
    playerVars:{
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  // Function to reduce the string
  function truncateString(str, num) {
    return str?.length > num ? str.slice(0, num) + "..." : str;
  }
  
  return(
    <>
      <header className="banner" style={{
      backgroungSize: "cover",
      backgroundImage: `url(
      "https://image.tmdb.org/t/p/original/${movie ?.backdrop_path}"
      )`,
      backgroundPosition: "center center",
      }}>
        {/* Backgroung image */}
        <div className="banner__contents">
          {/* title */}
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {/* div > 2 button */}
          <div className='banner__buttons'>
            <button className='banner__button' onClick={()=>handleClick(movie)}>Play</button>
            <button className='banner__button'>My List</button>
          </div>
          {/* description */}
          <h1 className='banner__description'>
            {/* {movie?.overview} */}
              { truncateString(movie?.overview,150) || truncateString(movie?.tagline,150)}
          </h1>
        </div> 
        <div className='banner__fadebottom'></div>
      </header>
      {trialerUrl ? <YouTube videoId={trialerUrl} opts={opts}/> : ''}
    </>
  )
}
export default Banner;