import React from 'react';
import './App.css';
import {HappyMeter} from '../HappyMeter/HappyMeter';
import {Stats} from '../Stats/Stats';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={Stats}/>
        <Route path="/add" exact component={HappyMeter}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
