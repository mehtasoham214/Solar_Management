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
import Title from "../../salesDashboard/Title";
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

function EquipmentTable() {
    const [equipmentData, setEquipmentData] = useState({});

    async function getEquipmentData() {
        const token = localStorage.getItem("token");
        const projectid = localStorage.getItem("projectId");
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}getequipment/${projectid}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            let data = await response.data;
            setEquipmentData(data.equipmentData);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getEquipmentData();
    }, []);

    if (Object.keys(equipmentData).length === 0) {
        return (
            <ThemeProvider theme={theme}>
                <Container
                    sx={{
                        border: 3,
                        borderRadius: 2,
                        borderColor: "gray",
                        height: 50,
                    }}
                >
                    <Grid container spacing={3} marginBottom={3}>
                        <Grid item ml={50} mt={-1}>
                            <h5>Equipment data not Available...</h5>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        );
    }
    const tableHeaders = ["Type", "Name", "Count"];
    const tableData = Object.entries(equipmentData)
        .filter(
            ([key]) =>
                ![
                    "oeFeasible",
                    "solarCost",
                    "wireCost",
                    "batteryCost",
                    "railsCost",
                    "chargeControllerCost",
                    "inverterCost",
                    "crewCost",
                ].includes(key)
        )
        .filter(([key]) => !key.includes("Count"))
        .map(([key, value]) => [
            key.replace(/Type$/, ""),
            value,
            equipmentData[`${key.replace(/Type$/, "")}Count`],
        ]);

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
                <Grid container spacing={3} marginBottom={3}>
                    <Grid item md={8}>
                        <Title>Equipment Details</Title>
                    </Grid>
                    <Grid item lg={6}>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 400 }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        {tableHeaders.map((header) => (
                                            <StyledTableCell key={header}>
                                                {header}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            {row.map((cell, index) => (
                                                <StyledTableCell key={index}>
                                                    {cell}
                                                </StyledTableCell>
                                            ))}
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default EquipmentTable;
