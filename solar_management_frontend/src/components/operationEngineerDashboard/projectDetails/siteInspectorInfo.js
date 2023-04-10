import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Grid } from "@mui/material";

//Theme Imports
import theme from "../../theme";
import Title from "../../salesDashboard/Title";
import { ThemeProvider } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function SiteInspectorInfo() {
    const [customer, getcustomer] = useState();

    async function GetcustomerDetails() {
        const token = localStorage.getItem("token");
        const projectId = localStorage.getItem("projectId");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}customer/${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data;
        getcustomer(data);
    }
    useEffect(() => {
        GetcustomerDetails();
    }, []);

    if (!customer) return <div>No Customer Found</div>;

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
                <Grid container spacing={3} marginBottom={3}>
                    <Grid item md={8}>
                        <Title>Site Inspector Info</Title>
                    </Grid>
                    <Grid item lg={6}>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 400 }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Info</StyledTableCell>
                                        <StyledTableCell align="right">
                                            Value
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Roof Area
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            500
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Feasability
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            YES
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Sunlight Access
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            Partially
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default SiteInspectorInfo;
