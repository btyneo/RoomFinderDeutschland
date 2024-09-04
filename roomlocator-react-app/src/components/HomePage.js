// src/components/HomePage.js
import React from 'react';
import '../styles/style.css'; // Import your CSS file

function HomePage() {
  return (
    <div>
      <header className="header">
        <div>RoomLocator <div className="small">Deutschland</div></div>
        <div className="right">
          <a href="#">Help</a>
          <a href="#">Sign in</a>
        </div>
      </header>
      <main className="main">
        Find Your Home.
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Enter a city or a Zipcode..." />
          <button type="button" className="search-button">Search</button>
        </div>
        <div className="advanced-search">
          <button type="button" className="advanced-bar">
            Or use our unique filters ▼
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
      <section className="form">
        <div className="heading"></div>
        <div className="var">
          <div>Enter City:</div>
          <input type="text" className="inputs cityName" placeholder="e.g Berlin" />
        </div>
        <div className="var">
          <div>Price range:</div>
          <input type="text" className="inputs min" placeholder="Min.. €" />
          <input type="text" className="inputs max" placeholder="Max.. €" />
        </div>
        {/* <div className="var">
          <div>Earliest move-in date:</div>
          <input type="date" className="inputs" />
        </div> */}
        <div>
          <button type="button" className="advanced-search-button">Search</button>
        </div>
      </section>
      <footer className="footer">
        created by
        <a href="https://github.com/btyneo" target="_blank" rel="noopener noreferrer"> btyneo </a> &
        <a href="https://github.com/hashimxkhan" target="_blank" rel="noopener noreferrer"> hashimxkhan </a>
      </footer>
    </div>
  );
}

export default HomePage;
