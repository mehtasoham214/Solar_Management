import * as React from "react";
import {useState, useEffect} from "react";
import axios from 'axios'
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

// function preventDefault(event) {
//     event.preventDefault();
// }

export default function Customer() {
    const navigate = useNavigate();

    const handleProjectClick = (event) => {
        event.preventDefault();
        navigate("/sales/projectdetails"); // replace with the desired path
    };

    const [customerlist, setCustomerList] = useState([]);
    async function getLeads() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}customers`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        setCustomerList(response.data);
    }
    useEffect(() => {
        getLeads();
    }, []);
    if (!customerlist) return (<div>No Leads Found</div>)


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
                                <TableCell onClick={handleProjectClick}>{customer.customerName}</TableCell>
                                <TableCell>{customer.customerNumber}</TableCell>
                                <TableCell>{customer.customerAddress}</TableCell>
                                <TableCell>{customer.projectAddress}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        </ThemeProvider>
    );
}
