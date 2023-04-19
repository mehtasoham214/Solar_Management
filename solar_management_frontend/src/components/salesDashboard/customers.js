import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function Customer() {
    const navigate = useNavigate();

    const handleProjectClick = (event, id) => {
        event.preventDefault();
        localStorage.setItem("projectId", id);
        navigate("/sales/projectdetails");
    };
    let projectId = undefined;
    const [customerlist, setCustomerList] = useState([]);
    async function getLeads() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}customers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCustomerList(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getLeads();
    }, []);
    console.log(projectId);
    if (!customerlist) return <div>No Customer Found</div>;

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
                        {customerlist.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell
                                    onClick={(event) =>
                                        handleProjectClick(
                                            event,
                                            customer.projectId
                                        )
                                    }
                                >
                                    {customer.customerName}
                                </TableCell>
                                <TableCell>{customer.customerNumber}</TableCell>
                                <TableCell>
                                    {customer.customerAddress}
                                </TableCell>
                                <TableCell>{customer.projectAddress}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        </ThemeProvider>
    );
}
