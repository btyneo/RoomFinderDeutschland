
import React from 'react';
import '../styles/style.css'; // Make sure your CSS file is imported

function NotFoundPage() {
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

      <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oops! Page Not Found</p>
      <p className="description">The page you're looking for does not exist.</p>
      <a href="/" className="home-button">Go to Home</a>
    </div>

      <footer className="footer notfound-page">
        created by
        <a href="https://github.com/btyneo" target="_blank" rel="noopener noreferrer"> btyneo </a> &
        <a href="https://github.com/hashimxkhan" target="_blank" rel="noopener noreferrer"> hashimxkhan </a>
        <p className='allrightsreserved'>&copy; 2024 RoomLocator Deutschland. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default NotFoundPage;
