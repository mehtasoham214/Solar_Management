import * as React from "react";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import CustomizedTables from "./projectdetails";
import PermanentDrawerLeft from "../navBar";
import Invoicetable from "./invoice";
import ProjectImage from "./projectImages";
import NotesTable from "../../notes";

function ProjectDashboard() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", mt: 2 }}>
                <PermanentDrawerLeft />

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
                        <CustomizedTables />
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

export default ProjectDashboard;
