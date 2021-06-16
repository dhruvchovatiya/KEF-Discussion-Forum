import Nav from './Nav.js'
import Thread from './Thread'
import Card from './Card.js'
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Login.js';
import SignUp from './SignUp.js';
import About from './About.js';
import Home from './Home.js';
import Analytics from './Analytics.js';

function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/about" component={About}/>
          <Route path="/analytics" component={Analytics}/>

        </Switch>

      </div>

    </Router>
      


  

    
  );
}

export default App;
