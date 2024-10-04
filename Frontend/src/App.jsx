import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar';
import Section from './Components/Section';

const Home = () => {
  const [sections, setSections] = useState([]);
  const [currentSectionId, setCurrentSectionId] = useState(1); 
  const [isVisible, setIsVisible] = useState(true); 
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sections`);
        const formattedSections = response.data.map(section => {
          const imageSrc = `${API_URL}${section.imageSrc}`;
          console.log(`Image Source for section ${section.id}:`, imageSrc); 
          return {
            ...section,
            imageSrc
          };
        });
        setSections(formattedSections);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };
  
    fetchSections();
  }, []);
  

  useEffect(() => {
    const sectionId = parseInt(location.pathname.split('-')[1]);
    setIsVisible(false); 
    setCurrentSectionId(sectionId); 

    const timer = setTimeout(() => {
      setIsVisible(true); 
    }, 300); 

    return () => clearTimeout(timer);
  }, [location]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar />
      <div className={`section-wrapper ${isVisible ? 'fade-in' : 'fade-out'}`}>
        <Routes>
          {sections.map((section) => (
            <Route 
              key={section.id}
              path={`/section-${section.id}`} 
              element={
                <Section 
                  title={section.title} 
                  paragraph1={section.paragraph1} 
                  paragraph2={section.paragraph2} 
                  imageSrc={section.imageSrc} 
                />
              } 
            />
          ))}
        </Routes>
      </div>
      
      <div className='button'>
        {sections.map((section) => (
          <button className={`button-btn ${currentSectionId === section.id ? 'active' : ''}`}
            key={section.id} 
            onClick={() => handleNavigate(`/section-${section.id}`)} 
            style={{ marginLeft: '10px' }}
          >
            Ir a {section.title}
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Home />
  </Router>
);

export default App;
