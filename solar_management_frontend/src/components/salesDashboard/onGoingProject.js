import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
//import { Button } from "@mui/material";

// Generate Order Data

function ButtonArray() {
    const buttonArray = ["Edit", "Done", "Delete"];

    return (
        <div>
            {/* <EditButton>buttonArray[0]</EditButton>
              <button >buttonArray[0]</button>
              <button >buttonArray[0]</button> */}

            {buttonArray.map((buttonText, index) => (
                <button style={{ marginLeft: "10px" }} key={index}>
                    {buttonText}
                </button>
            ))}
        </div>
    );
}

function createData(id, date, ProductName, CustomerName, Status, cost, Action) {
    return { id, date, ProductName, CustomerName, Status, cost, Action };
}

const rows = [
    createData(
        0,
        "16 Mar, 2019",
        "Solar Plant 1",
        "Tupelo, MS",
        "Pending",
        312.44,
        ButtonArray()
    ),
    createData(
        1,
        "16 Mar, 2019",
        "Solar Plant 2",
        "London, UK",
        "In-Progress",
        866.99,
        ButtonArray()
    ),
    createData(
        2,
        "16 Mar, 2019",
        "Solar Plant 3",
        "Boston, MA",
        "Pending",
        100.81,
        ButtonArray()
    ),
    createData(
        3,
        "16 Mar, 2019",
        "Solar Plant 4",
        "Gary, IN",
        "Pending",
        654.39,
        ButtonArray()
    ),
    createData(
        4,
        "15 Mar, 2019",
        "Solar Plant 5",
        "Long Branch, NJ",
        "In-Progress",
        212.79,
        ButtonArray()
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function OngoingProject() {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Title>On-Going Projects</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Cost</TableCell>

                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.ProductName}</TableCell>
                                <TableCell>{row.CustomerName}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{`$${row.cost}`}</TableCell>

                                <TableCell
                                    style={{
                                        color:
                                            row.Status === "Pending"
                                                ? theme.palette.error.main
                                                : row.Status === "In-Progress"
                                                ? theme.palette.warning.main
                                                : "",
                                    }}
                                >
                                    {row.Status}
                                </TableCell>
                                <TableCell>{row.Action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link
                    color="primary"
                    href="#"
                    onClick={preventDefault}
                    sx={{ mt: 3 }}
                >
                    See more orders
                </Link>
            </React.Fragment>
        </ThemeProvider>
    );
}
