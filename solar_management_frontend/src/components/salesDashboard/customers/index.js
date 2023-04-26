//React Imports
import * as React from "react";

//Components Imports
import PermanentDrawerLeft from "../navBar";
import Customer from "../customer";

//Material ui Imports
import { Box, Container, Grid, Paper } from "@mui/material";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

export default function AllCustomer() {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
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
                        <Container maxWidth="lg" sx={{ mt: 2 }}>
                            {/* Customers */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Customer />
                                </Paper>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </React.Fragment>
        </ThemeProvider>
    );
}
