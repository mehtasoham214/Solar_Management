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
    const [sidata, getsidata] = useState();

    async function GetcustomerDetails() {
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
        const data = await response.data.areaInfo;
        getsidata(data);
        console.log(data)
    }
    useEffect(() => {
        GetcustomerDetails();
    }, []);

    if (!sidata) return <div>No Site Inspector Data Found</div>;

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
                                            Backyard Info
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {sidata.backyardInfo}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Roof Info
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {sidata.roofInfo}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Grid
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {sidata.grid}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Irradiance
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {sidata.irradiance}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Meter Compatibility
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.meterCompatibility === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.meterCompatibility ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.meterCompatibility}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Co-ordinates
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {sidata.coordinates}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Environmental Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                                color:
                                                    sidata.environment === "Yes"
                                                        ? theme.palette.success.main
                                                        : sidata.environment ===
                                                        "No"
                                                        ? theme.palette.error.main
                                                        : "",
                                        }}>
                                            {sidata.environment}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Building Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.building === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.building ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.building}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Electrical Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.electrical === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.electrical ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.electrical}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Zonal Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.zone === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.zone ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.zone}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Land Use Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.landUse === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.landUse ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.landUse}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Inter-Connection Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.interconnection === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.interconnection ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.interconnection}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Net Metering Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.netMetering === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.netMetering ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.netMetering}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Property Easement Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.propertyEasement === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.propertyEasement ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.propertyEasement}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            HOA Permit
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.hoa === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.hoa ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.hoa}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Feasability
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.feasibility === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.feasibility ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.feasibility}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            Structural Feasibility
                                        </StyledTableCell>
                                        <StyledTableCell align="right"
                                        style={{
                                            color:
                                                sidata.structuralFeasibility === "Yes"
                                                    ? theme.palette.success.main
                                                    : sidata.structuralFeasibility ===
                                                    "No"
                                                    ? theme.palette.error.main
                                                    : "",
                                    }}>
                                            {sidata.structuralFeasibility}
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
