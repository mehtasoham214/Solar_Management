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
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

//import { Button } from "@mui/material";

// Generate Order Data

export default function OngoingProject({ showMoreLink = true }) {
    const navigate = useNavigate();

    // Handling Done Button Click
    const handleButton = async (id) => {
        const type = "Done";
        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(
                `${process.env.REACT_APP_API_URL}projectstatus`,
                { type, id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                let tempType = "Marked As " + type;
                alert(`Project ${tempType} Successfully`);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSeeMoreClick = (event) => {
        event.preventDefault();
        navigate("/team-lead/ongoingprojects"); // replace with the desired path
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
        // navigate("/sales/projectdetails");
        navigate("/team-lead/projectdetails");
    };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                {/* <Title>On-Going Projects</Title> */}
                <h1>On-Going Projects</h1>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Address</TableCell>
                            <TableCell>Crew</TableCell>
                            <TableCell>Action</TableCell>
                            {/* <TableCell>Cost</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell> */}
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
                                <TableCell>
                                    <button
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => {
                                            handleButton(row._id);
                                        }}
                                    >
                                        Done
                                    </button>
                                </TableCell>
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
