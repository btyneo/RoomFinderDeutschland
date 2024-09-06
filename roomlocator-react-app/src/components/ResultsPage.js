// src/components/ResultsPage.js
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/style.css'; // Make sure your CSS file is imported
import FetchData from './data-retrieval';
import ListingsTable from './create-table';

function ResultsPage() {
  
  const location = useLocation();
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [data, setData] = useState([]);
  let ListingsData = [];
  
 

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const cityParam = params.get('city');
      const minPriceParam = params.get('minPrice');
      const maxPriceParam = params.get('maxPrice');
      setCity(cityParam);
      setMinPrice(minPriceParam);
      setMaxPrice(maxPriceParam);
  
      const ListingsData = await FetchData(cityParam, minPriceParam, maxPriceParam);
      setData(ListingsData)
    }
    fetchData();

  }, [location.search])

 ListingsData = FetchData(city, minPrice, maxPrice) //this is a list with dictionaries which have rent name poster free from url other details room size
 
  return (
    <div className='results-page'>
      <header className="header">
        <div>RoomLocator <div className="small">Deutschland</div></div>
        <div className="right">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
      </header>

      <div className='table'> 
        <ListingsTable data={data}></ListingsTable>
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
