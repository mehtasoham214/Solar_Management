import * as React from "react";

//Theme Imports
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import TeamLeadPermanentDrawerLeft from "./navBar";
import { Typography } from "@mui/material";

function TLDashboard() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: "flex", mt: 2 }}>
                <TeamLeadPermanentDrawerLeft />

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
                        <Typography>Some content here</Typography>
                    </Container>

        </Box>
        </Box>
    </ThemeProvider>
  );
}

export default TLDashboard;