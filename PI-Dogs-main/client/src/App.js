import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Card from './components/Card/Card.jsx';
import Cards from './components/Cards/Cards.jsx';
import LandingPage from './components/landingPage/LandingPage';
import DogDetail from './components/DogDetail/DogDetail';


function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path={'/'} component={LandingPage}/>
      <Route path={'/api'} component={NavBar}/>
      <Route exact path="/api/home" component={Home} />
      <Route path={'/api/dogDetail/:id'} component={DogDetail}/>
      
    </div>
  );
}

export default App;
