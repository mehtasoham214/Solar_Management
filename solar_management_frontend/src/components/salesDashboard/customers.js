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
function createData(customerName, customerNumber, customerAddress, projectAddress) {
    return { customerName, customerNumber, customerAddress, projectAddress };
}

const rows = [
    createData(
        "Jim Smith",
        1234567890,
        "128 somerville, NJ",
        "128 somerville, NJ"
    ),
    createData(
        "Tom Jefferson",
        1234567890,
        "128 somerville, NJ",
        "128 somerville, NJ"
    ),
    createData(
        "Mark Bistro",
        1234567890,
        "128 somerville, NJ",
        "128 somerville, NJ"
    ),
];

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function Customer() {
    const navigate = useNavigate();

    const handleProjectClick = (event) => {
        event.preventDefault();
        navigate("/sales/projectdetails"); // replace with the desired path
    };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Title>Customer Details</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer Number</TableCell>
                            <TableCell>Customer Address</TableCell>
                            <TableCell>Project Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell onClick={handleProjectClick}>{row.customerName}</TableCell>
                                <TableCell>{row.customerNumber}</TableCell>
                                <TableCell>{row.customerAddress}</TableCell>
                                <TableCell>{row.projectAddress}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        </ThemeProvider>
    );
}
