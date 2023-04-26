import * as React from "react";
import axios from "axios";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../salesDashboard/Title";

export default function AllPastRequests() {
    const [ongoing, getongoing] = useState();
    async function Getongoingproject() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}request/allfinished`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data;
        getongoing(data);
    }
    useEffect(() => {
        Getongoingproject();
    }, []);

    if (!ongoing) return <div>No Ongoing Projects</div>;

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
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
                            <Title>Past Requests</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Request</TableCell>
                                        <TableCell>Project Address</TableCell>
                                        <TableCell>Requested By</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ongoing.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                {row.projectRequest}
                                            </TableCell>
                                            <TableCell>{row.project}</TableCell>
                                            <TableCell>
                                                {row.postedby}
                                            </TableCell>
                                            <TableCell>{row.date}</TableCell>

                                            <TableCell
                                                style={{
                                                    color:
                                                        row.status ===
                                                        "Approved"
                                                            ? theme.palette
                                                                  .success.main
                                                            : row.status ===
                                                              "Denied"
                                                            ? theme.palette
                                                                  .error.main
                                                            : "",
                                                }}
                                            >
                                                {row.status}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Container>
            </React.Fragment>
        </ThemeProvider>
    );
}
