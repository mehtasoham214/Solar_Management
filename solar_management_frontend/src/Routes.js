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
import OEMaterials from "./components/operationEngineerDashboard/materials";
import OEProjectDetails from "./components/operationEngineerDashboard/projectDetails/projectDetailsDashboard";
import OEALLOngoingProjects from "./components/operationEngineerDashboard/onGoingProjectsComponent";
import OEALLPastProjects from "./components/operationEngineerDashboard/pastProjectsComponents";
import TLALLOngoingProjects from "./components/teamLeadDashboard/onGoingProjectsComponent";
import TLALLPastProjects from "./components/teamLeadDashboard/pastProjectsComponents";
import TLProjectDetails from "./components/teamLeadDashboard/projectDetails/projectDetailsDashboard";
import TLRequests from "./components/teamLeadDashboard/requests";

import Requests from "./components/operationManagerDashboard/requests";
import OpsEnginner from "./components/operationManagerDashboard/opsEngineer";
import Sales from "./components/operationManagerDashboard/sales";
import SiteInspector from "./components/operationManagerDashboard/siteInspector";
import TeamLead from "./components/operationManagerDashboard/teamlead";

import SIForm from "./components/siteInspectorDashboard/SIFormComponent";

//import SIALLPastProjects from "./components/siteInspectorDashboard/pastProjectComponent";
//import SIALLOngoingProjects from "./components/siteInspectorDashboard/ongoingProjectComponent";

function ProjectRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/sales" element={<Dashboard />} />
            <Route
                path="/sales/ongoingprojects"
                element={<ALLOngoingProjects />}
            />
            <Route path="/sales/pastprojects" element={<ALLPastProjects />} />
            <Route
                path="/sales/projectdetails"
                element={<ProjectDashboard />}
            />
            <Route path="/sales/leads" element={<AllLeads />} />
            <Route path="/sales/customers" element={<AllCustomer />} />
            <Route exact path="/ops-manager" element={<OMDashboard />} />
            <Route
                path="/ops-manager/ongoingprojects"
                element={<AllOMOngoingProjects />}
            />
            <Route
                path="/ops-manager/pastprojects"
                element={<AllOMPastProjects />}
            />
            <Route
                path="/ops-manager/projectdetails"
                element={<OMProjectDashboard />}
            />
            <Route path="/ops-manager/requests" element={<Requests />} />
            <Route
                path="/ops-manager/operationengineer"
                element={<OpsEnginner />}
            />
            <Route
                path="/ops-manager/siteinspector"
                element={<SiteInspector />}
            />
            <Route path="/ops-manager/sales" element={<Sales />} />
            <Route path="/ops-manager/teamlead" element={<TeamLead />} />
            <Route path="/ops-engineer" element={<OEDashboard />} />
            <Route
                path="/ops-engineer/materials"
                element={<OEMaterials />}
            ></Route>
            <Route
                path="/ops-engineer/projectdetails"
                element={<OEProjectDetails />}
            ></Route>
            <Route
                path="/ops-engineer/ongoingprojects"
                element={<OEALLOngoingProjects />}
            ></Route>
            <Route
                path="/ops-engineer/pastprojects"
                element={<OEALLPastProjects />}
            ></Route>
            <Route path="/site-inspector" element={<SIDashboard />} />
            <Route
                path="/site-inspector/projectdetails"
                element={< SIForm/>}
            ></Route>
            <Route
                path="/site-inspector/pastprojects"
                //element={<SIALLPastProjects />}
            ></Route>
            <Route
                path="/site-inspector/ongoingprojects"
                //element={<SIALLOngoingProjects />} 
            ></Route>
            <Route path="/team-lead" element={<TLDashboard />} />
            <Route
                path="/team-lead/ongoingprojects"
                element={<TLALLOngoingProjects />}
            />
            <Route
                path="/team-lead/pastprojects"
                element={<TLALLPastProjects />}
            />
            <Route
                path="/team-lead/projectdetails"
                element={<TLProjectDetails />}
            />
            <Route path="/team-lead/requests" element={<TLRequests />} />
        </Routes>
    );
}

export default ProjectRouter;
// Error in line 35,36, 103,107 in Routes.js