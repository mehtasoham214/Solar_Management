import * as React from "react";
import {useState,  useEffect} from "react";
import axios  from 'axios'
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

export default function Leads() {
    const navigate = useNavigate();

    const handleProjectClick = (event) => {
        event.preventDefault();
        navigate("/sales/projectdetails"); // replace with the desired path
    };

    const [leadslist, setLeads] = useState([]);
    async function getLeads() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}leads`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setLeads(response.data);
    }
    useEffect(() => {
        getLeads();
    }, []);
    if (!leadslist) return (<div>No Leads Found</div>)




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
                        {leadslist.map((lead) => (
                            <TableRow key={lead.id}>
                                <TableCell onClick={handleProjectClick}>{lead.customerName}</TableCell>
                                <TableCell>{lead.customerNumber}</TableCell>
                                <TableCell>{lead.Date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        </ThemeProvider>
    );
}
