import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

//Import Solar Management pages
import home from "./home";
import login from "./login";

//Import Common components
import header from "./common/header";
import navigation from "./common/navigation";

function App() {
  return (
    <Route exact path="/login" component={login} />
    <PrivateRoute exact path="/home" component={home} />
  );
}

export default App;
