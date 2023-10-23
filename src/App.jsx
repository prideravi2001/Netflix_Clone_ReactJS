import './App.css'
import Row from './component/Row';
import requests from './requests';
import Banner from './component/Banner';
import Nav from './component/Nav';
export default function App() {
  return (
    <>
     <div className='app'>
       {/* Nav */}
       <Nav />
       {/* Banner */}
       <Banner />
       <Row title="NETFLIX ORIFINAL" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
       <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
       <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
       <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
       <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
       <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
       <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
       <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
     </div>
     <footer>
        <p>Copyright &copy; 2022 - Movie List</p>
       <p>Author: Ravi Kant</p>
       <p><a href="mailto:ravikant4101707@gmail.com">ravikant4101707@gmail.com</a></p>
       <p>React Based Application</p>
     </footer>
    </>
  )
}
