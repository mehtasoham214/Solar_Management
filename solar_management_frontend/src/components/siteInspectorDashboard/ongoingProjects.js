import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Title from "./Title";
import theme from "../theme";
import Title from "../salesDashboard/Title";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Generate Order Data

export default function OngoingProject({ showMoreLink = true }) {
    const navigate = useNavigate();

    const handleSeeMoreClick = (event) => {
        event.preventDefault();
        navigate("/site-inspector/ongoingprojects"); // replace with the desired path
    };

    const [ongoing, getongoing] = useState();

    async function Getongoingproject() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}inprogress`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data;
        getongoing(data);
    }
    useEffect(() => {
        Getongoingproject();
    }, []);

    if (!ongoing) return <div>No Ongoing Projects</div>;

    const handleProjectClick = (event, projectId) => {
        event.preventDefault();
        localStorage.setItem("projectId", projectId);
        navigate("/site-inspector/projectdetails");
    };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Title> On-Going Projects</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Address</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ongoing.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell
                                    onClick={(event) =>
                                        handleProjectClick(event, row._id)
                                    }
                                >
                                    {row.projectAddress}
                                </TableCell>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.startDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {showMoreLink && (
                    <Link
                        color="primary"
                        href="#"
                        onClick={handleSeeMoreClick}
                        sx={{ mt: 3 }}
                    >
                        See more Projects
                    </Link>
                )}
            </React.Fragment>
        </ThemeProvider>
    );
}
