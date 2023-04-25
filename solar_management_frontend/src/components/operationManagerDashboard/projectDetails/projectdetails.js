//React Imports
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//Import for table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//Theme Imports
import theme from "../../theme";
import OMDropBox from "./dropbox";
import { ThemeProvider, Container, Grid, styled, Paper } from "@mui/material";

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

function OMCustomizedTables() {
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
                    <Grid item md={6}>
                        <h1>Project Information</h1>
                    </Grid>
                    <Grid
                        item
                        md={8}
                        display="flex"
                        alignItems={{
                            xs: "center",
                            md: "flex-end",
                            lg: "flex-end",
                        }}
                        justifyContent="flex-end"
                        sx={{ marginBottom: 2 }}
                    ></Grid>
                    <Grid item lg={6}>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 400 }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Title</StyledTableCell>
                                        <StyledTableCell align="right">
                                            Details
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Customer Name
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.customerName}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Customer Number
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.customerNumber}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Customer Address
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.customerAddress}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Project Address
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.projectAddress}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Sales Incharge
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.salesIncharge}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Site Inspector
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.siteInspector}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Operations Engineer
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.operationEngineer}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Team Lead
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.teamLead}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Project Status
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.projectStatus}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Project Progress
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.projectProgress}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Start Date
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.projectStartDate}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            End Date
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.projectEndDate}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Total Cost
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {customer.totalCost}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={6}>
                        <OMDropBox />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default OMCustomizedTables;
