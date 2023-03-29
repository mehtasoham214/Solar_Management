import * as React from "react";

//Theme Imports
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import SiPermanentDrawerLeft from "./navBar";
import { Typography } from "@mui/material";
import SiteInspectorForm from "./SiteInspectorForm";

function SIDashboard() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: "flex", mt: 2 }}>
                <SiPermanentDrawerLeft />

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
                      <SiteInspectorForm/>
                    </Container>

        </Box>
        </Box>
    </ThemeProvider>
  );
}

export default SIDashboard;