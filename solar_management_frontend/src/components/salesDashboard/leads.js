import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
//import { Button } from "@mui/material";

// Generate Order Data
function createData(customerName, customerNumber, Date) {
    return { customerName, customerNumber, Date };
}

const rows = [
    createData(
        "Jim Smith",
        1234567890,
        "16 Mar, 2019"
    ),
    createData(
        "Tom Jefferson",
        1234567890,
        "22 Apr, 2011"
    ),
    createData(
        "Mark Bistro",
        1234567890,
        "26 Sep, 2007"
    ),
];

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function Leads() {
    const navigate = useNavigate();

    const handleProjectClick = (event) => {
        event.preventDefault();
        navigate("/sales/projectdetails"); // replace with the desired path
    };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Title>Leads</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer Number</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell onClick={handleProjectClick}>{row.customerName}</TableCell>
                                <TableCell>{row.customerNumber}</TableCell>
                                <TableCell>{row.Date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        </ThemeProvider>
    );
}
