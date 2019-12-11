import React from "react";
import "./App.css";
import About from "./Components/About";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Home from "./Components/Home";
import User from "./Components/User";
import RepRequest from "./RepRequest";
//renamined browerser router as router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/Signup";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from "./Components/Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={SignUp} />
            <Route path="/rep" component={RepRequest} />
            <PrivateRoute exact path="/user" component={User} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
