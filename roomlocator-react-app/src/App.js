import React, { useEffect } from 'react';
import FetchData from './components/data-retrieval';

const App = () => {
  useEffect(() => {
    // Call FetchData when the component mounts
    const fetchData = async () => {
      await FetchData();
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h1>Data Retrieval</h1>
      {/* You can add more JSX here */}
    </div>
  );
};

export default App;
