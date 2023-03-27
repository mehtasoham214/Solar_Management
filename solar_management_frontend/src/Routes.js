import React from "react";
import { Route, Routes } from "react-router-dom";
import ALLOngoingProjects from "./components/onGoingProjects";
import ALLPastProjects from "./components/pastProjects";
import ProjectDashboard from "./components/projectDetails/projectDashboard";
import AllLeads from "./components/leads";
import AllCustomer from "./components/customers";
import Dashboard from "./components/salesDashboard/dashboard";
import OMDashboard from "./components/operationManagerDashboard";
import OEDashboard from "./components/operationEngineerDashboard";
import SIDashboard from "./components/siteInspectorDashboard";
import TLDashboard from "./components/teamLeadDashboard";
import Login from "./components/login";
import Register from "./components/register";


function Router(){
    return (
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route exact path="/sales" element={<Dashboard />} />
                <Route path="/sales/ongoingprojects" element={<ALLOngoingProjects />} />
                <Route path="/sales/pastprojects" element={<ALLPastProjects />} />
                <Route path="/sales/projectdetails" element={<ProjectDashboard />} />
                <Route path="/sales/leads" element={<AllLeads />} />
                <Route path="/sales/customers" element={<AllCustomer />} />
                <Route path="/ops-manager" element={<OMDashboard />} />
                <Route path="/ops-engineer" element={<OEDashboard/>} />
                <Route path="/site-inspector" element={<SIDashboard/>} />
                <Route path="/team-lead" element={<TLDashboard/>} />
            </Routes>
    );
}

export default Router;