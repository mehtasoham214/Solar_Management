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
import AllOMOngoingProjects from "./components/operationManagerDashboard/onGoingProjectComponent";
import AllOMPastProjects from "./components/operationManagerDashboard/pastProjectComponent";
import OMProjectDashboard from "./components/operationManagerDashboard/projectDetails";


function ProjectRouter(){
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
                <Route exact path="/ops-manager" element={<OMDashboard />} />
                    <Route path="/ops-manager/ongoingprojects" element={<AllOMOngoingProjects />} />
                    <Route path="/ops-manager/pastprojects" element={<AllOMPastProjects />} />
                    <Route path="/ops-manager/projectdetails" element={<OMProjectDashboard />} />
                    <Route path="/ops-manager/requests" element={<OMDashboard />} />
                    <Route path="/ops-manager/equipments" element={<OMDashboard />} />
                    <Route path="/ops-manager/operationengineer" element={<OMDashboard />} />
                    <Route path="/ops-manager/siteinspector" element={<OMDashboard />} />
                    <Route path="/ops-manager/sales" element={<OMDashboard />} />
                    <Route path="/ops-manager/teamlead" element={<OMDashboard />} />
                <Route path="/ops-engineer" element={<OEDashboard/>} />
                <Route path="/site-inspector" element={<SIDashboard/>} />
                <Route path="/team-lead" element={<TLDashboard/>} />
            </Routes>
    );
}

export default ProjectRouter;