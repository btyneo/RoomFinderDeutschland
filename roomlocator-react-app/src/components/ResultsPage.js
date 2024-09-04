// src/components/ResultsPage.js
import React from 'react';
import '../styles/style.css'; // Make sure your CSS file is imported

function ResultsPage() {
  return (
    <div>
      <header className="header">
        <div>RoomLocator <div className="small">Deutschland</div></div>
        <div className="right">
          <a href="#">Help</a>
          <a href="#">Sign in</a>
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
