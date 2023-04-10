import * as React from "react";

//Theme Imports
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import OngoingProject from "./ongoingProjects";
import PastProject from "./pastProjects";

import OEPermanentDrawerLeft from "./navBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import NotesTable from "../notes";

function OEDashboard() {
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
                        {/* <Typography>Some content here</Typography> */}
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <OngoingProject />
                                </Paper>
                          </Grid>
                          <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <PastProject />
                                </Paper>
                          </Grid>
                          <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <NotesTable />
                                </Paper>
                          </Grid>
                        </Grid>
                    </Container>

        </Box>
        </Box>
    </ThemeProvider>
  );
}

export default OEDashboard;