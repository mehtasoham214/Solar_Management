//React Imports
import * as React from "react";
import { useState, useEffect } from "react";

//Axios Imports
import axios from "axios";

//Components Imports

//Material UI Imports
import { styled } from "@mui/material/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Container,
    Grid,
    ButtonGroup,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

//Theme Imports
import theme from "../../theme";
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

function CustomizedTables() {
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

    //Button Action
    const handleButton = async (type, id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(
                `${process.env.REACT_APP_API_URL}projectstatus`,
                { type, id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                let tempType = type;
                if (tempType === "Cancel") {
                    tempType = "Cancell";
                }
                alert(`Project ${tempType}ed Successfully`);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {/* Displaying Project information */}
            <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
                <Grid container spacing={3} marginBottom={3}>
                    <Grid item md={4}>
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
                    >
                        <ButtonGroup variant="outlined">
                            <Button
                                color="secondary"
                                onClick={() =>
                                    handleButton("Start", customer.projectId)
                                }
                            >
                                Start
                            </Button>
                            <Button
                                color="success"
                                onClick={() =>
                                    handleButton("Finish", customer.projectId)
                                }
                            >
                                Finish
                            </Button>
                            <Button
                                color="error"
                                onClick={() =>
                                    handleButton("Cancel", customer.projectId)
                                }
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Grid>
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
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default CustomizedTables;
