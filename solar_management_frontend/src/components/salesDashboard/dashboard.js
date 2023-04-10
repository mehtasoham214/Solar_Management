import * as React from "react";
import { useState, useEffect } from "react";

// import axios
import axios from "axios";
//Theme Imports
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

//Project Imports
import Counter from "./counter";
import OngoingProject from "./onGoingProject";
import PastProject from "./pastProjects";
import PermanentDrawerLeft from "./navBar";

//Date Picker Imports
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Material UI Imports
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
//import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

//Material UI Icons Imports
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddHomeIcon from "@mui/icons-material/AddHome";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Navigation Imports
// import { Route, Routes } from "react-router-dom";
// import ALLOngoingProjects from "../onGoingProjects"
// import ALLPastProjects from "../pastProjects";
// import ProjectDashboard from "../projectDetails/projectDashboard";
// import AllLeads from "../leads";
// import AllCustomer from "../customers";

function SalesDashboardContent() {
    // Setting Ongoing Project Count
    const [ongoing, setOngoing] = useState();
    async function fetchData() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}ongoingcount`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data.counts;
        setOngoing(data);
    }

    //  Setting Past Project Count
    const [past, setPast] = useState();
    async function getPastCount() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}pastcount`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data.counts;
        setPast(data);
    }
    const [totalcost, settotalcost] = useState();
    async function gettotalcostcount() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}gettotalCost`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data.cost;
        settotalcost(data);
    }
    useEffect(() => {
        fetchData();
        getPastCount();
        gettotalcostcount();
    }, []);

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                customerName: customerName,
                customerNumber: customerNumber,
                customerAddress: customerAddress,
                projectAddress: projectAddress,
                date: date,
            };
            debugger;
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}projects/add`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [customerName, setCustomerName] = useState("");
    const [customerNumber, setCustomerNumber] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [projectAddress, setProjectAddress] = useState("");
    const [date, setDate] = useState("");

    return (
        <ThemeProvider theme={theme}>
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
                    <Toolbar />
                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            {/* Counter */}
                            <Grid item xs={12} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        bgcolor: "#FFD9B7",
                                    }}
                                >
                                    <Counter
                                        title="On-going Projects"
                                        icon={<InsertDriveFileIcon />}
                                        count={JSON.stringify(ongoing, 0)}
                                    />
                                </Paper>
                            </Grid>
                            {/* Counter */}
                            <Grid item xs={12} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        bgcolor: "#FFB7B7",
                                    }}
                                >
                                    <Counter
                                        title="Past Projects"
                                        icon={<FactCheckIcon />}
                                        count={JSON.stringify(past, 0)}
                                    />
                                </Paper>
                            </Grid>
                            {/* Counter */}
                            <Grid item xs={12} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        bgcolor: "#B7FFBE",
                                    }}
                                >
                                    <Counter
                                        title="Total Sales"
                                        icon={<RequestQuoteIcon />}
                                        count={totalcost}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                {/* Create Customer Button */}
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<CreateNewFolderIcon />}
                                    onClick={handleOpenDialog}
                                >
                                    <Typography>Create New Project</Typography>
                                </Button>
                                <Dialog
                                    open={openDialog}
                                    onClose={handleCloseDialog}
                                >
                                    <DialogTitle
                                        style={{ textAlign: "center" }}
                                    >
                                        Create New Project
                                    </DialogTitle>
                                    <DialogContent>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "16px",
                                                mt: "20px",
                                            }}
                                        >
                                            <TextField
                                                id="customer-name"
                                                label="Customer Name"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCustomerName(
                                                        e.target.value
                                                    )
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AccountCircle
                                                                sx={{
                                                                    color: "action.active",
                                                                    m: 0.5,
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                id="customer-number"
                                                label="Customer Number"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCustomerNumber(
                                                        e.target.value
                                                    )
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PhoneIcon
                                                                sx={{
                                                                    color: "action.active",
                                                                    m: 0.5,
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                id="customer-address"
                                                label="Customer Address"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setCustomerAddress(
                                                        e.target.value
                                                    )
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AddHomeIcon
                                                                sx={{
                                                                    color: "action.active",
                                                                    m: 0.5,
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                id="project-address"
                                                label="Project Address"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setProjectAddress(
                                                        e.target.value
                                                    )
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationOnIcon
                                                                sx={{
                                                                    color: "action.active",
                                                                    m: 0.5,
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <TextField
                                                id="appointment-date"
                                                label="Appointment Date"
                                                variant="outlined"
                                                type="datetime-local"
                                                onChange={(e) =>
                                                    setDate(e.target.value)
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarMonthIcon
                                                                sx={{
                                                                    color: "action.active",
                                                                    m: 0.5,
                                                                }}
                                                            />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                <DatePicker label="Basic date picker" />
                                                </DemoContainer>
                                            </LocalizationProvider> */}
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            variant="outlined"
                                            onClick={handleCloseDialog}
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={handleSubmit}
                                            color="secondary"
                                        >
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            {/* On going projects */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <OngoingProject />
                                </Paper>
                            </Grid>
                            {/* Past projects */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <PastProject />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <SalesDashboardContent />;
}
