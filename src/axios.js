import axios from 'axios';

/** base url to mmake requests to the movie database */
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default instance;
// export default axios.create({
//   baseURL: 'https://api.themoviedb.org/3',
//   params: {
//     api_key: '3e1a5bc5b8b7c8cfe1feafbabd18b42c',
//     language: 'en-US',
//   },
// });
