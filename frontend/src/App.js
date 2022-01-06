import React from "react"
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
// import Home from './Home';
// import Player from './Player';
// import Header from "./Header.js";
// import UploadVideoPage from './VideoUploadPage';
import First from "./First.js"
import Second from "./Second.js"


function App() {
  
  const [data, setData] = React.useState()

  React.useEffect( async() => {
      let result = await fetch("/example")
      console.log(result)
      result = await result.json()
      setData(result.test)
      
  }, [])
  return (
  <Router>
      <Switch> 
        <Route exact path="/first" component={First}></Route> 
        <Route exact path="/second" component={Second}></Route> 
        
      </Switch>
    </Router>
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
