
import React from 'react';
import '../styles/style.css'; // Make sure your CSS file is imported

function AboutPage() {
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
       <h1>About</h1>
       <p> Add details here</p>
      </div>

      <footer className="footer about-page">
        created by
        <a href="https://github.com/btyneo" target="_blank" rel="noopener noreferrer"> btyneo </a> &
        <a href="https://github.com/hashimxkhan" target="_blank" rel="noopener noreferrer"> hashimxkhan </a>
      </footer>
    </div>
  );
}

export default AboutPage;
