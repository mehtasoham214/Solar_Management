import * as React from "react";
import axios from "axios";
import OMPermanentDrawerLeft from "../navBar";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../salesDashboard/Title";
import { useNavigate } from "react-router-dom";
export default function AllOMOngoingProjects() {
    const navigate = useNavigate();
    function ButtonArray() {
        const buttonArray = ["Edit", "Done", "Delete"];

        return (
            <div>
                {buttonArray.map((buttonText, index) => (
                    <button style={{ marginLeft: "10px" }} key={index}>
                        {buttonText}
                    </button>
                ))}
            </div>
        );
    }

    const [ongoing, getongoing] = useState();
    async function Getongoingproject() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}allinprogress`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data;
        console.log(data);
        getongoing(data);
    }
    useEffect(() => {
        Getongoingproject();
    }, []);

    if (!ongoing) return <div>No Ongoing Projects</div>;

    const rows = ButtonArray();

    const handleProjectClick = (event, projectId) => {
        event.preventDefault();
        localStorage.setItem("projectId", projectId);
        navigate("/ops-manager/projectdetails");
    };
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
                        <Container maxWidth="lg" sx={{ mt: 2 }}>
                            {/* On going projects */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <ThemeProvider theme={theme}>
                                        <React.Fragment>
                                            <Title>On-Going Projects</Title>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Product Address
                                                        </TableCell>
                                                        <TableCell>
                                                            Customer Name
                                                        </TableCell>
                                                        <TableCell>
                                                            Date
                                                        </TableCell>
                                                        <TableCell>
                                                            Cost
                                                        </TableCell>
                                                        <TableCell>
                                                            Status
                                                        </TableCell>
                                                        <TableCell>
                                                            Action
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {ongoing.map((row) => (
                                                        <TableRow key={row.id}>
                                                            <TableCell
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handleProjectClick(
                                                                        event,
                                                                        row._id
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    row.projectAddress
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    row.customerName
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.startDate}
                                                            </TableCell>
                                                            <TableCell>{`$${
                                                                row.totalCost ??
                                                                0
                                                            }`}</TableCell>

                                                            <TableCell
                                                                style={{
                                                                    color:
                                                                        row.projectStatus ===
                                                                        "Pending"
                                                                            ? theme
                                                                                  .palette
                                                                                  .error
                                                                                  .main
                                                                            : row.projectStatus ===
                                                                              "In-Progress"
                                                                            ? theme
                                                                                  .palette
                                                                                  .warning
                                                                                  .main
                                                                            : "",
                                                                }}
                                                            >
                                                                {
                                                                    row.projectStatus
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {rows}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </React.Fragment>
                                    </ThemeProvider>
                                </Paper>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </React.Fragment>
        </ThemeProvider>
    );
}
