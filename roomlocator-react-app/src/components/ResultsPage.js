// src/components/ResultsPage.js
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/style.css'; // Make sure your CSS file is imported
import FetchData from './data-retrieval';


function ResultsPage() {
  
  const location = useLocation();
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const minPriceParam = params.get('minPrice');
    const maxPriceParam = params.get('maxPrice');
    setCity(cityParam);
    setMinPrice(minPriceParam);
    setMaxPrice(maxPriceParam);
  

  }, [location.search])

 FetchData(city, minPrice, maxPrice)


  return (
    <div>
      <header className="header">
        <div>RoomLocator <div className="small">Deutschland</div></div>
        <div className="right">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
      </header>

      <div> 
        <table className="table">
          {/* Table content goes here */}
        </table>
      </div>

      <footer className="footer results-page">
        created by
        <a href="https://github.com/btyneo" target="_blank" rel="noopener noreferrer"> btyneo </a> &
        <a href="https://github.com/hashimxkhan" target="_blank" rel="noopener noreferrer"> hashimxkhan </a>
      </footer>
    </div>
  );
}

export default ResultsPage;
