
import React from 'react';
import '../styles/style.css'; // Make sure your CSS file is imported
import {useEffect, useState} from 'react';

function AboutPage() {

  
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger fade-in animation on page load
  useEffect(() => {
    setFadeIn(true);
  }, []);


  return (
    <div className={`aboutpagewhole ${fadeIn ? 'fadein' : ''}`}>
      <header className="header">
        <div>RoomLocator <div className="small">Deutschland</div></div>
        <div className='demo'>Demo</div>
        <div className="right">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
      </header>
      <h1 className='aboutheading'>About Us</h1>
      <body className='aboutpagebody'> 
       
       <p1 className='maintext'> At RoomLocator Deutschland, we get how challenging it can be for students coming to Germany, especially when it comes to finding a place to live. The demand for rooms far exceeds the supply, and it often means students spend countless hours searching for the right option, only to find out it’s already taken. </p1>
       <p1 className='maintext'> Our mission at RoomLocator Deutschland is to make finding your ideal room quick and easy. We pull data from multiple websites and bring it all together in one place, so you can find what you need without wasting hours on endless searches. With just a few clicks, you’ll have all the information you need right at your fingertips. Say goodbye to the stress and frustration of room hunting – we’ve got you covered!</p1>
       <p2 className='finaltext'>RoomLocator Deutschland is currently in development, and what you see here is a demo. We're working on updating the data and integrating information from additional sites. The full version of the project will be available by next year!</p2>
      <p2 className='finaltext'>This project is brought to you by <b>Hamza Sohail</b> and <b>Hashim Khan</b>. You can check out our GitHub profiles by clicking the links in the footer at the bottom of the page.
</p2>
      </body>

      <footer className="footer about-page">
        created by
        <a href="https://github.com/btyneo" target="_blank" rel="noopener noreferrer"> btyneo </a> &
        <a href="https://github.com/hashimxkhan" target="_blank" rel="noopener noreferrer"> hashimxkhan </a>
        <p className='allrightsreserved'>&copy; 2024 RoomLocator Deutschland. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
