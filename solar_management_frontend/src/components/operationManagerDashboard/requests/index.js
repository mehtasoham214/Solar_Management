import React from "react";
import AllCurrentRequests from "./currentRequests";
import AllPastRequests from "./pastRequests";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material";
import OMPermanentDrawerLeft from "../navBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Requests (){
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
            <AllCurrentRequests />
            </Grid>
            <Grid item xs={12}>
            <AllPastRequests />
            </Grid>
            </Grid>

            </Box>
            </Box>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default Requests;