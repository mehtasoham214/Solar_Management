import React from "react";
import OpsEngineerList from "./opsEngineer";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material";
import OMPermanentDrawerLeft from "../navBar";
import Box from "@mui/material/Box";

function OpsEnginner (){
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
                        <OpsEngineerList />
            </Box>
            </Box>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default OpsEnginner;