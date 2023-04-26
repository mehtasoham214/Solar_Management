import * as React from "react";
import { useState, useEffect } from "react";

// import axios
import axios from "axios";
//Theme Imports
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

//Project Imports
import Counter from "../salesDashboard/counter";
import OMOngoingProject from "./ongoingProjects";
import OMPastProject from "./pastProjects";
import PermanentDrawerLeft from "./navBar";

//Material UI Imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

//Material UI Icons Imports
import FactCheckIcon from "@mui/icons-material/FactCheck";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

function OMDashboard() {
    // Setting Ongoing Project Count
    const [ongoing, setOngoing] = useState();
    async function fetchData() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}ongoingcount`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data.counts;
        setOngoing(data);
    }

    //  Setting Past Project Count
    const [past, setPast] = useState();
    async function getPastCount() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}pastcount`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data.counts;
        setPast(data);
    }
    const [totalcost, settotalcost] = useState();
    async function gettotalcostcount() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}gettotalCost`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data.cost;
        settotalcost(data);
    }
    useEffect(() => {
        fetchData();
        getPastCount();
        gettotalcostcount();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", mt: 2 }}>
                {/* Menu for operation manager */}
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
                    <Toolbar />
                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            {/* Counter */}
                            <Grid item xs={12} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        bgcolor: "#FFD9B7",
                                    }}
                                >
                                    <Counter
                                        title="On-going Projects"
                                        icon={<InsertDriveFileIcon />}
                                        count={JSON.stringify(ongoing, 0)}
                                    />
                                </Paper>
                            </Grid>
                            {/* Counter */}
                            <Grid item xs={12} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        bgcolor: "#FFB7B7",
                                    }}
                                >
                                    <Counter
                                        title="Past Projects"
                                        icon={<FactCheckIcon />}
                                        count={JSON.stringify(past, 0)}
                                    />
                                </Paper>
                            </Grid>
                            {/* Counter */}
                            <Grid item xs={12} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        bgcolor: "#B7FFBE",
                                    }}
                                >
                                    <Counter
                                        title="Total Sales"
                                        icon={<RequestQuoteIcon />}
                                        count={JSON.stringify(totalcost, 0)}
                                    />
                                </Paper>
                            </Grid>
                            {/* On going projects */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <OMOngoingProject />
                                </Paper>
                            </Grid>
                            {/* Past projects */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <OMPastProject />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default OMDashboard;
