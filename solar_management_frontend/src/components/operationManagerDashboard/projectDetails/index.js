import * as React from "react";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import OMCustomizedTables from "./projectdetails";
// import Invoicetable from "../../projectDetails/invoice";
import Invoicetable from "../../salesDashboard/projectDetails/invoice";
import ProjectImage from "../../salesDashboard/projectDetails/projectImages";

import OMPermanentDrawerLeft from "../navBar";
import NotesTable from "../../notes";

function OMProjectDashboard() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", mt: 2 }}>
                <OMPermanentDrawerLeft />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                        ml: 28,
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg">
                        <OMCustomizedTables />
                        <br></br>
                        <br></br>
                        <Invoicetable />
                        <br></br>
                        <br></br>
                        <ProjectImage />
                        <br></br>
                        <br></br>
                        <NotesTable />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default OMProjectDashboard;
