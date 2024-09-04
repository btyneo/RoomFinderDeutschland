
import React from 'react';
import '../styles/style.css'; // Make sure your CSS file is imported

function NotFoundPage() {
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
       <h1>How Did You Get Here?</h1>
       <p> Error! Page Not Found.</p>
      </div>

      <footer className="footer notfound-page">
        created by
        <a href="https://github.com/btyneo" target="_blank" rel="noopener noreferrer"> btyneo </a> &
        <a href="https://github.com/hashimxkhan" target="_blank" rel="noopener noreferrer"> hashimxkhan </a>
      </footer>
    </div>
  );
}

export default NotFoundPage;
