import React from "react";
import "./App.css";
import About from "./Components/About";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Home from "./Components/Home";
//renamined browerser router as router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
