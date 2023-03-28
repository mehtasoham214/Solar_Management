import * as React from "react";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import OMCustomizedTables from "./projectdetails";

import OMPermanentDrawerLeft from "../navBar";

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
                        {/* <CustomizedTables />
                        <br></br>
                        <br></br>
                        <Invoicetable />
                        <br></br>
                        <br></br>
                        <ProjectImage /> */}
                        <OMCustomizedTables />
                    </Container>

        </Box>
        </Box>
    </ThemeProvider>
  );
}

export default OMProjectDashboard;