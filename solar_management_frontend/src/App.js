import "./App.css";
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";

import SalesRoutes from "./Routes";


function App() {
    return (
        <Router>
            <SalesRoutes />
        </Router>
    );
}

export default App;
