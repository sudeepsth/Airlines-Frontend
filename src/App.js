import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom'
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import BookFlight from './pages/BookFlight';
import BookFinalize from './pages/BookFinalize';
import Nav from './components/Nav';
import TrackFlight from './pages/TrackFlight';

function App() {
  
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/book-flight" element={<BookFlight />} />
        <Route path="/book-status" element={<BookFinalize />} />
        <Route path="/track-flight" element={<TrackFlight />} />
      </Routes>

    </Router>
  );
}

export default App;
