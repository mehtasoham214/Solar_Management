import * as React from "react";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import OEPermanentDrawerLeft from "../navBar";

import TLOpsEngineerInfo from "./opsEngineerInfo";
import TLProjectDetailsTable from "./projectDetailsTable";


function TLProjectDetails() {
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
                        <TLProjectDetailsTable />
                        <br></br>
                        <br></br>
                        <TLOpsEngineerInfo />
                    </Container>

        </Box>
        </Box>
    </ThemeProvider>
  );
}

export default TLProjectDetails;