import React from "react";
import TLAllCurrentRequests from "./currentRequests";
import TLAllPastRequests from "./pastRequests";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material";
import OMPermanentDrawerLeft from "../navBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function TLRequests (){
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
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

            <Grid container spacing={2}>
                <Grid item xs={12}>
            <TLAllCurrentRequests />
            </Grid>
            <Grid item xs={12}>
            <TLAllPastRequests />
            </Grid>
            </Grid>

            </Box>
            </Box>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default TLRequests;