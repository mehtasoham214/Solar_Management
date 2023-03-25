import * as React from "react";
import PermanentDrawerLeft from "../salesDashboard/navBar";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useState,  useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../salesDashboard/Title";
import { useNavigate } from "react-router-dom";
export default function ALLOngoingProjects() {
    const navigate = useNavigate();
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

const [projectlist, setemployees] = useState(null)
    useEffect(() => {
        getemployees()
    }, [])
    const getemployees = () => {
        fetch("http://localhost:3000/projects")
            .then(res => res.json())
            .then(
                (result) => {                    
                    setemployees(result)
                },
                (error) => {
                    setemployees(null);
                }
            )
    }

    if (!projectlist) return (<div>No Record Found</div>)



const rows = ButtonArray();

    const handleProjectClick = (event) => {
        event.preventDefault();
        navigate("/projectdetails"); // replace with the desired path
    };
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Box sx={{ display: "flex", mt: 2 }}>
                    <PermanentDrawerLeft />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                            ml: 28,
                        }}
                    >
                        <Container maxWidth="lg" sx={{ mt: 2 }}>
                            {/* On going projects */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <ThemeProvider theme={theme}>
            <React.Fragment>
                <Title>On-Going Projects</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectlist.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell onClick={handleProjectClick}>{row._id}</TableCell>
                                <TableCell>{row.customerName}</TableCell>
                                <TableCell>{row.startDate}</TableCell>
                                <TableCell>{`$${row.cost}`}</TableCell>

                                <TableCell
                                    style={{
                                        color:
                                            row.projectStatus === "Pending"
                                                ? theme.palette.error.main
                                                : row.projectStatus === "In-Progress"
                                                ? theme.palette.warning.main
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
            </React.Fragment>
        </ThemeProvider>
                                </Paper>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </React.Fragment>
        </ThemeProvider>
    );
}
