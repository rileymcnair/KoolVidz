import React from 'react';
import logo from './logo.svg';
import UploadVideoPage from './VideoUploadPage'
//import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import Header from "./Header.js"

function App() {
  return (
    
    <Router>
      <Header /> 
      <Switch> 
      <Route exact path="/" component={Home} /*More pages should be added*/>
      </Route> 
      <Route path="/player/:id" component={Player}>
      </Route>
      <Route path="/videoupload" component={UploadVideoPage}>
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
