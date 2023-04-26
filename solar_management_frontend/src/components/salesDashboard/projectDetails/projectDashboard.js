//React Imports
import * as React from "react";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

//Material ui Imports
import { Toolbar, Box, Container } from "@mui/material";

//Components Imports
import CustomizedTables from "./projectdetails";
import PermanentDrawerLeft from "../navBar";
import Invoicetable from "./invoice";
import ProjectImage from "./projectImages";
import NotesTable from "../../notes";

function ProjectDashboard() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", mt: 2 }}>
                {/* Menu drawer for sales dashboard */}
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
                    {/* Imported components display */}
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
