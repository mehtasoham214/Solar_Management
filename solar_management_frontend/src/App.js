import "./App.css";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

// import { BrowserRouter as Router} from "react-router-dom";

import ProjectRouter from "./Routes";


function App() {
    return (
        <Router>
            <ProjectRouter/>

            </Router>  );
}

export default App;
