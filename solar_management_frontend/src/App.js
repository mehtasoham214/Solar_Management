import "./App.css";
import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/salesDashboard/dashboard";
import ALLOngoingProjects from "./components/onGoingProjects";
import ALLPastProjects from "./components/pastProjects";
import ProjectDashboard from "./components/salesDashboard/projectDashboard";
import SiteInspectorForm from "./components/SiteInspectorForm";
=======
import { BrowserRouter as Router} from "react-router-dom";

import SalesRoutes from "./Routes";
>>>>>>> a8188732002495188bcd6a282b7424c674b8b23e


function App() {
    return (
        <Router>
<<<<<<< HEAD
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                    path="/ongoingprojects"
                    element={<ALLOngoingProjects />}
                />
                <Route path="/pastprojects" element={<ALLPastProjects />} />
                <Route path="/projectdetails" element={<ProjectDashboard />} />
                <Route path="/SiteInspectorForm" element={<SiteInspectorForm />} />
            </Routes>
=======
            <SalesRoutes />
>>>>>>> a8188732002495188bcd6a282b7424c674b8b23e
        </Router>
       
    );
}

export default App;
