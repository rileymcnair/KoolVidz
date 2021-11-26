import logo from './logo.svg';
// import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import Header from './Header';
import API from '../../backend/api-spec.json';

function App() {
  return (
    <Router>
      <Switch> 
      <Route exact path="/" component={Home} /*More pages should be added*/>
      </Route> 
      <Route path="/player/:id" component={Player}>
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
