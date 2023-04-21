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

function TLOpsEngineerInfo() {
    const [equipment, getEquipment] = useState([]);

    async function GetEquipmentDetails() {
        const token = localStorage.getItem("token");
        const projectId = localStorage.getItem("projectId");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}projects/${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data;
        getEquipment(data.equipment);
    }
    useEffect(() => {
        GetEquipmentDetails();
    }, []);

    if (!equipment) return <div>Operations Enginner hasn't allocated materials!</div>;

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
                <Grid container spacing={3} marginBottom={3}>
                    <Grid item md={8}>
                        <Title>Data from OE</Title>
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
                                            {equipment.solarType}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {equipment.solarCount}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {equipment.wireType}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {equipment.wireCount}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {equipment.batteryType}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {equipment.batteryCount}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {equipment.railsType}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {equipment.railsCount}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {equipment.chargeControllerType}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {equipment.chargeControllerCount}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            {equipment.inverterType}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {equipment.inverterCount}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Crew Teams
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {equipment.crewCount}
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
                                            {equipment.oeFeasible ? "Yes": "No"}
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

export default TLOpsEngineerInfo;
