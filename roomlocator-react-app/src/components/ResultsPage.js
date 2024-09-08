// src/components/ResultsPage.js
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/style.css'; // Make sure your CSS file is imported
import FetchData from './data-retrieval';
import ListingsTable from './create-table';
import { useHistory } from 'react-router-dom';


function ResultsPage() {
  
    //this is search again 
    
    const history = useHistory();
    const [theme, setTheme] = useState('light-theme'); // Default theme
  
    const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'dark-theme' ? 'light-theme' : 'dark-theme');
    };
  

  const location = useLocation();
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [data, setData] = useState([]);
  const [searchCity, setSearchCity] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
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
 
 //this is for searching new city 
 const handleCitySearch = (e) => {
  setSearchCity(e.target.value);
 };

 const handleSearchClick = () => {
  if (searchCity) {
    history.push(`?city=${searchCity}`);
  }
 };

 const sortTable = () => {
  const sortedData = [...data].sort((a, b) => {
    const rentA = parseFloat(a.apartment_rent); // Assuming 'rent' is a property of 'a'
    const rentB = parseFloat(b.apartment_rent); // Assuming 'rent' is a property of 'b'

    return sortOrder === 'asc' ? rentA - rentB : rentB - rentA;
  });
  setData(sortedData);
  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
};
  

  return (
    <div className={`results-page ${theme}`}>
      <header className="header">
        <div>RoomLocator <div className="small">Deutschland</div></div>
        <div className='demo'>Demo</div>
        <div className="right">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
      </header>
      <div className="cityname-container">
        <h1 className="citynameheading">City: {city}</h1>
      </div>
      <div className={`body-results ${theme}`}>

        <div className='controls'>
         
         <div className='searchbutton'>
          <input type='text' value={searchCity} onChange={handleCitySearch} placeholder="Enter a city or a town.."/>
          <button type='button' onClick={handleSearchClick}>Search</button>
         </div>
         <button type='button' className='control-button' onClick={toggleTheme}>Theme</button>
         <button type='button' className='control-button' onClick={sortTable}>Sort By Rent {sortOrder === 'asc' ?  '▼' : '▲'}</button>

        </div>
        <div className='table'> 
        <ListingsTable data={data}></ListingsTable>
      </div>
      
      </div>
      
      <footer className={`footer results-page ${theme}`}>
        created by
        <a href="https://github.com/btyneo" target="_blank" rel="noopener noreferrer"> btyneo </a> &
        <a href="https://github.com/hashimxkhan" target="_blank" rel="noopener noreferrer"> hashimxkhan </a>
        <p className='allrightsreserved'>&copy; 2024 RoomLocator Deutschland. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ResultsPage;
