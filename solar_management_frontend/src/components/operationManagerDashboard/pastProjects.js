//React imports
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Axios imports
import axios from "axios";

//Components imports
import Title from "../salesDashboard/Title";

//Material UI imports
import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

//Theme imports
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

// Generate Order Data

export default function OMPastProject({ showMoreLink = true }) {
    const navigate = useNavigate();

    const handleSeeMoreClick = (event) => {
        event.preventDefault();
        navigate("/ops-manager/pastprojects"); // replace with the desired path
    };

    function ButtonArray() {
        const buttonArray = ["PDF"];

        return (
            <div>
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
        navigate("/ops-manager/projectdetails");
    };

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                {/* Past project display */}
                <Title>Past Projects</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Address</TableCell>
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
                                <TableCell>
                                    {`${
                                        row.totalCost === "Not Assigned"
                                            ? 0
                                            : row.totalCost
                                    }`}
                                </TableCell>

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
