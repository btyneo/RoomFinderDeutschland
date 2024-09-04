// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage'; // Example additional page
import NotFoundPage from './components/NotFoundPage';
import './styles/style.css'; // Import your CSS

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/results" component={ResultsPage} />
        <Route path="*" component={NotFoundPage} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;

//FROM HERE NOW U HAVE MADE THE MAIN PAGE.
//NEXT STEP: adjust it so that the data user enters is saved and then when they click on search etc it takes u to another home page 
//where then u can create the table