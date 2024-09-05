// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage'; // Example additional page
import NotFoundPage from './components/NotFoundPage';
import AboutPage from './components/AboutPage';
import './styles/style.css'; // Import your CSS

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/results" component={ResultsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} />
        {/* NOTE: ALWAYS MAKE SURE U PUT THE NOTFOUND page at the end, because routes are checked in order they are listed. */}
        
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;

//FROM HERE NOW CREATED LINKS BETWEEN PAGES SO U CAN NAVIGATE EASILY.
//NEXT STEP: NOW THAT U HAVE THE DATA FROM USER, RUN THE FUNCTION AND CREATE A TABLE.
// once ure done with this, then u can start creating the about page and not found page. 