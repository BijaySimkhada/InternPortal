
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import Reset from "./Pages/User/Reset";
import Dashboard from "./admin/Dashboard";
import Homepage from "./components/landing/Homepage";
import Userdashboard from './admin/Userdashboard'
import Admindashboard from './admin/Admindashboard'

function App() {
  return (


    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/Userdashboard" component={Userdashboard} />
          <Route exact path="/Admindashboard" component={Admindashboard} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
