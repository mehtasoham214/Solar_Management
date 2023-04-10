import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Grid, ButtonGroup } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

function Invoicetable() {
    const TAX_RATE = 0.0625;
    const [equipmentData, setEquipmentData] = useState([]);
    async function GetEquipmentData() {
        debugger;
        const projectID = localStorage.getItem("projectId");
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}generateInvoice/${projectID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data;
        setEquipmentData(data);
    }
    useEffect(() => {
        GetEquipmentData();
    }, []);

    // const rows = [
    //     createRow("Solar Panels", 125, 1.15),
    //     createRow("Batteries", 10, 45.99),
    //     createRow("Wiring", 2, 17.99),
    // ];

    const rows = Object.entries(equipmentData)
        .filter(([key]) => key.endsWith("Count")) // only consider keys that end with "Count"
        .map(([key, value]) => {
            const itemName = equipmentData[key.replace(/Count$/, "Type")]; // get the item name
            const itemQuantity = equipmentData[key.replace(/Count$/, "Count")];
            const itemCost = equipmentData[key.replace(/Count$/, "Cost")]; // get the cost for this item type
            const rowLabel = `${itemName}`;
            return createRow(rowLabel, itemQuantity, itemCost);
        });

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function priceRow(qty, unit) {
        return qty * unit;
    }

    function createRow(desc, qty, unit) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price };
    }

    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    return (
        <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
            <Grid container spacing={3} marginBottom={3}>
                <Grid item md={4}>
                    <h1>Invoice</h1>
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
                        <Button color="secondary">Download</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 700 }}
                            aria-label="spanning table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>
                                        Details
                                    </TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell align="right">Qty.</TableCell>
                                    <TableCell align="right">
                                        Price(one)
                                    </TableCell>
                                    <TableCell align="right">Sum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.desc}>
                                        <TableCell>{row.desc}</TableCell>
                                        <TableCell align="right">
                                            {row.qty}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.unit}
                                        </TableCell>
                                        <TableCell align="right">
                                            {ccyFormat(row.price)}
                                        </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Subtotal</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(invoiceSubtotal)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell align="right">{`${(
                                        TAX_RATE * 100
                                    ).toFixed(0)} %`}</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(invoiceTaxes)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(invoiceTotal)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Invoicetable;
