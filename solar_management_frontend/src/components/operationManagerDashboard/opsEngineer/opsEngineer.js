//React imports
import * as React from "react";
import { useState, useEffect } from "react";

//Axios imports
import axios from "axios";

//Theme imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

//Material UI imports
import {
    Box,
    Button,
    Container,
    Dialog,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

//Components imports
import AddEmployee from "../addEmployee/addEmployee";
import Title from "../../salesDashboard/Title";

export default function OpsEngineerList() {
    const [openDialog, setOpenDialog] = useState(false);
    const [operationEngineer, setOperationEngineer] = useState("");

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    async function GetOperationsEngineer() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}getoperationsengineer`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.data;
            setOperationEngineer(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetOperationsEngineer();
    }, []);

    if (!operationEngineer) return <div>No Operations Engineer</div>;

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
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
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Title>Operation Engineers</Title>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={handleOpenDialog}
                                >
                                    Add Operation Engineer
                                </Button>
                                <Dialog
                                    open={openDialog}
                                    onClose={handleCloseDialog}
                                >
                                    <AddEmployee />
                                </Dialog>
                            </Box>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Position</TableCell>
                                        <TableCell>Contact</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {operationEngineer.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>
                                                {row.username}
                                            </TableCell>
                                            <TableCell>
                                                {row.position}
                                            </TableCell>
                                            <TableCell>{row.contact}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Container>
            </React.Fragment>
        </ThemeProvider>
    );
}
