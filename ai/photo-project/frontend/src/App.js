import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Pages/Home';
import Photos from './components/Pages/Photos';
import Music from './components/Pages/Music';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/music" component={Music} />
      </Switch>
    </Router>
  );
}

export default App;
