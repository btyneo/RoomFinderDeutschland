// src/components/HomePage.js
import React, { useCallback } from 'react';
import { useState , useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/style.css'; // Import your CSS file

function HomePage() {

  //this is just for the button scrolling function 
  const filtersRef = useRef(null)
  const ScrollToFilters = () => {
    filtersRef.current.scrollIntoView({behavior: 'smooth'})
  }

  //these are where the inputs (form submission) will be stored
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [isTopSearchDisabled, SetIsTopSearchDisabled] = useState(true);
  const [error, setError] = useState('');

  const history = useHistory();


  //the e in the functions below stands for 'event', when the event happens. the e.preventDefault() means that arguments cant be empty
  // Handle search by city only
  const handleCitySearch = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/results',
      search: `?city=${encodeURIComponent(city)}`
    });
  };

  //this one has city, min and max price 
  const handleAdvancedCitySearch = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/results',
      search: `?city=${encodeURIComponent(city)}&minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`
    });
  };


const topCitiesGermany = ["berlin", "hamburg", "munich", "cologne", "frankfurt am main", "stuttgart", "duesseldorf", "leipzig", "dortmund", "essen", "bremen", "dresden", "hanover", "nuremberg", "duisburg", "bochum", "wuppertal", "bielefeld", "bonn", "muenster", "karlsruhe", "mannheim", "augsburg", "wiesbaden", "gelsenkirchen", "moenchengladbach", "braunschweig", "chemnitz", "aachen", "kiel", "halle (saale)", "magdeburg", "freiburg im breisgau", "krefeld", "luebeck", "oberhausen", "erfurt", "mainz", "rostock", "kassel", "hagen", "saarbruecken", "hamm", "potsdam", "ludwigshafen am rhein", "oldenburg", "leverkusen", "osnabrueck", "solingen", "heidelberg", "herne", "neuss", "darmstadt", "regensburg", "paderborn", "jena", "cottbus", "wuerzburg", "trier", "kaiserslautern", "giessen", "tuebingen", "ulm", "landshut", "worms", "loerrach", "weimar", "goerlitz", "speyer", "konstanz", "hildesheim", "offenbach am main", "zwickau", "bamberg", "remscheid", "suhl", "stendal", "rheinbach", "gotha", 'rosenheim', 'aschaffenburg', 'erlangen', 'nurnberg'];


//validation of fields 
const validateInput = useCallback(() => {
  const formattedCity = city.toLowerCase();
  if ((minPrice < 0 || maxPrice < 0)) {
    setError('Prices cannot be negative.');
    setIsSearchDisabled(true);
  } else if ((Number(minPrice) >= Number(maxPrice))) {
    setError('Minimum price cannot be greater than or equal to the maximum price.');
    setIsSearchDisabled(true);
  } else if (!topCitiesGermany.includes(formattedCity)) {
    setError('Sorry! We do not currently have that city in our database.');
    setIsSearchDisabled(true);
  } else {
    setError('');
    setIsSearchDisabled(false);
  }
}, [city, minPrice, maxPrice, topCitiesGermany]);

useEffect(() => {
  validateInput();
}, [validateInput]);


  //this is for disabling search when fields are filled out 
  useEffect(() => {
    if (city && minPrice && maxPrice) {
      setIsSearchDisabled(false);
    } else {
      setIsSearchDisabled(true);
    }
  }, [city, minPrice, maxPrice]);

  useEffect(() => {
    if (city) {
      SetIsTopSearchDisabled(false);
    } else {
      SetIsTopSearchDisabled(true);
    }
  }, [city]);

  return (
    <div>
      <header className="header">
        <div>RoomLocator <div className="small">Deutschland</div></div>
        <div className='demo'>Demo</div>
        <div className="right">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
      </header>
      <main className="main">
        Find Your Home.
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Enter a city or a town..." value={city} onChange={(e) => setCity(e.target.value)} />
          <button type="button" className="search-button" disabled={isTopSearchDisabled} onClick={handleCitySearch}>Search</button>
        </div>
        <div className="advanced-search">
          <button type="button" className="advanced-bar" onClick={ScrollToFilters}>
            Or use our helpful filters ▼
          </button>
        </div>
      </main>
      <section className="mid">
        <div className="heading">
          Your future home, in one search.
        </div>
        <div className="text">
          RoomFinder searches through all major housing websites in Germany, to find the perfect matches for you.
        </div>
        <div className="heading">
          Advanced search features.
        </div>
        <div className="text">
          Personalize your experience to only view listings viable for you.
        </div>
      </section>
      <section className="form" ref={filtersRef}>
        <div className="heading"></div>
        <div className="var">
          <div>Enter City:</div>
          <input type="text" className="inputs cityName" placeholder="e.g Berlin" value={city} onChange={(e) => setCity(e.target.value)}/>
        </div>
        <div className="var">
          <div>Price range:</div>
          <input type="text" className="inputs min" placeholder="Min.. €" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
          <input type="text" className="inputs max" placeholder="Max.. €" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
        {/* <div className="var">
          <div>Earliest move-in date:</div>
          <input type="date" className="inputs" />
        </div> */}
        <div>
          <button type="button" className="advanced-search-button" disabled={isSearchDisabled} onClick={handleAdvancedCitySearch}>Search</button>
        </div>
      </section>
      <footer className="footer">
        created by
        <a href="https://github.com/btyneo" target="_blank" rel="noopener noreferrer"> btyneo </a> &
        <a href="https://github.com/hashimxkhan" target="_blank" rel="noopener noreferrer"> hashimxkhan </a>
        <p className='allrightsreserved'>&copy; 2024 RoomLocator Deutschland. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
