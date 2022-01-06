import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import Header from "./Header.js";
import UploadVideoPage from './VideoUploadPage';

function App() {
  useEffect( () => {
    fetch("/example")
  }
  )
  return (
    <h1>hello world</h1>
    // <Router>
    //   <Header/> 
    //   <Switch> 
    //     <Route exact path="/" component={Home}></Route> 
    //     <Route path="/search/:query?" component={Home}></Route> 
    //     <Route path="/player/:id" component={Player}></Route>
    //     <Route path="/videoupload" component={UploadVideoPage}></Route>
    //   </Switch>
    // </Router>
  );
}

export default App;
