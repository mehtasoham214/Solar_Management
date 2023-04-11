import * as React from "react";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import OEPermanentDrawerLeft from "../navBar";
import CustomerDetailsTables from "./customerDetailsTable";
import MaterialSubmissionForm from "./materialSubmissionForm";
import SiteInspectorInfo from "./siteInspectorInfo";
import NotesTable from "../../notes";

function OEProjectDetails() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", mt: 2 }}>
                <OEPermanentDrawerLeft />

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
                        <CustomerDetailsTables />
                        <br></br>
                        <br></br>
                        <SiteInspectorInfo />
                        <br></br>
                        <br></br>
                        <MaterialSubmissionForm />
                        <br></br>
                        <br></br>
                        <NotesTable />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default OEProjectDetails;
