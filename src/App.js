import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; // Make sure to import axios

import { MyContext } from './MyContext';
import Home from './pages/Home';
import Header from './components/Header';
import About from './pages/About';
import Methodology from './pages/Methodology';
import SingleMethodology from './pages/SingleMethodology';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';

function App() {
  const [methodologyContent, setMethodologyContent] = useState([]);
  const [caseContent, setCaseContent] = useState([]);

  const fetchFeaturedImage = async (mediaId) => {
    try {
      const response = await axios.get(
        `https://sti7ch.com/wp-json/wp/v2/media/${mediaId}`
      );
      return response.data.source_url;
    } catch (error) {
      console.error('Error fetching featured image:', error);
      return null;
    }
  };

  return (
    <div className="App pt-[80px]">
      <MyContext.Provider
        value={{
          methodologyContent,
          setMethodologyContent,
          fetchFeaturedImage,
          caseContent,
          setCaseContent,
        }}
      >
        <Router basename="/dev">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/methodology/:slug" element={<SingleMethodology />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
