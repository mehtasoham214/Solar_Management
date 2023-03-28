import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
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

export default function PastProject({ showMoreLink = true }) {
    const navigate = useNavigate();

    const handleSeeMoreClick = (event) => {
        event.preventDefault();
        navigate("/pastprojects"); // replace with the desired path
    };

    function ButtonArray() {
        const buttonArray = ["PDF"];

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

    const [past, getpast] = useState();

    async function Getpastproject() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}finished`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data;
        console.log(data);
        getpast(data);
    }
    useEffect(() => {
        Getpastproject();
    }, []);

    if (!past) return <div>No Finished Projects</div>;

    const rows = ButtonArray();

    const handleProjectClick = (event, projectId) => {
        event.preventDefault();
        localStorage.setItem("projectId", projectId);
        navigate("/sales/projectdetails");
    };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Title>On-Going Projects</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Address</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {past.map((row) => (
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
                                <TableCell>{`$${
                                    row.totalCost ?? 0
                                }`}</TableCell>

                                <TableCell
                                    style={{
                                        color:
                                            row.projectStatus === "Cancelled"
                                                ? theme.palette.error.main
                                                : row.projectStatus ===
                                                  "Finished"
                                                ? theme.palette.success.light
                                                : "",
                                    }}
                                >
                                    {row.projectStatus}
                                </TableCell>
                                <TableCell>{rows}</TableCell>
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
