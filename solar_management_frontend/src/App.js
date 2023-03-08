import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/salesDashboard/dashboard";
import ALLOngoingProjects from "./components/onGoingProjects";
import ALLPastProjects from "./components/pastProjects";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                    path="/ongoingprojects"
                    element={<ALLOngoingProjects />}
                />
                <Route path="/pastprojects" element={<ALLPastProjects />} />
            </Routes>
        </Router>
    );
}

export default App;
