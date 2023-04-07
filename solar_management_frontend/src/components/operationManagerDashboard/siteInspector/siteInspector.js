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


export default function SiteInspectorList() {
    const [siteInspector, setSiteInspector] = useState();
    async function GetSiteInspector() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}getsiteinspectors`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.data;
            setSiteInspector(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetSiteInspector();
    }, []);

    if (!siteInspector) return <div>No Site Inspector Member</div>;

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
                                            <Title>Site inspectors</Title>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Name
                                                        </TableCell>
                                                        <TableCell>
                                                            Username
                                                        </TableCell>
                                                        <TableCell>
                                                            Position
                                                        </TableCell>
                                                        <TableCell>
                                                            Contact
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {siteInspector.map((row) => (
                                                        <TableRow key={row.id}>
                                                            <TableCell>
                                                                {
                                                                    row.name
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    row.username
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.position}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.contact}
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
