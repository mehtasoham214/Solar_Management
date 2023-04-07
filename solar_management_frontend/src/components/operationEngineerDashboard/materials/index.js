import * as React from "react";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@mui/material";

import OEPermanentDrawerLeft from "../navBar";
import DropdownAndTable from "./materials";

function OEMaterials() {
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
                    {/* <Toolbar />
                    <Container maxWidth="lg"
                    //  sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}
                     >
                        <DropdownAndTable/>
                    </Container> */}
                    <Toolbar />
                    <Container maxWidth="lg">
                        {/* <DropdownAndTable /> */}
                        {/* <br></br>
                        <br></br>
                        <SiteInspectorInfo />
                        <br></br>
                        <br></br>
                        <MaterialSubmissionForm /> */}
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <DropdownAndTable />
                                </Paper>
                          </Grid>
                        </Grid>
                    </Container>

        </Box>
        </Box>
    </ThemeProvider>
  );
}

export default OEMaterials;