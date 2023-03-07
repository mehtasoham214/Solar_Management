import * as React from "react";
import { useState } from "react";

//Project Imports
import Counter from "./counter";
import Orders from "./project";
import { mainListItems, secondaryListItems } from "./menuItems";

//Material UI Imports
import {
    Avatar,
    Drawer,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
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

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a237e",
        },
        secondary: {
            main: "#880e4f",
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        fontSize: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
                outlinedPrimary: {
                    color: "#AAA",
                    backgroundColor: "#transparent",
                    borderWidth: "3px",
                    borderColor: "#AAAAAA",
                    "&:hover": {
                        backgroundColor: "#cdcdcd",
                        borderColor: "#fff",
                        color: "#fff",
                    },
                },
                outlinedSecondary: {
                    color: "#fff",
                    backgroundColor: "#880e4f",
                    borderColor: "#880e4f",
                    "&:hover": {
                        backgroundColor: "#4a148c",
                        borderColor: "#4a148c",
                        color: "#fff",
                    },
                },
            },
        },
    },
});

function SalesDashboardContent() {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        console.log("handleOpenDialog called");
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    function handleSubmit() {
        // get the form data
        const formData = {
            customerName: document.getElementById("customer-name").value,
            customerNumber: document.getElementById("customer-number").value,
            customerAddress: document.getElementById("customer-address").value,
            projectAddress: document.getElementById("project-address").value,
        };

        // submit the form data to the server or do any other processing here
        console.log(formData);

        // close the dialog box
        handleCloseDialog();
    }
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", mt: 2 }}>
                <Drawer variant="permanent">
                    <Avatar
                        sx={{ width: 80, height: 80, mx: "auto", mt: 4 }}
                    ></Avatar>
                    <Typography sx={{ mx: "auto" }} variant="subtitle1">
                        Alex
                    </Typography>
                    <Typography sx={{ mx: "auto" }} variant="subtitle2">
                        SalePerson
                    </Typography>
                    <List sx={{ mt: 8 }} component="nav">
                        {mainListItems}
                        {/* <Divider sx={{ my: 1 }} /> */}
                        {secondaryListItems}
                    </List>
                </Drawer>
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems}
                </List>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
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
                                        count={3}
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
                                        count={23}
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
                                        count={13}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} lg={4}>
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
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            variant="contained"
                                            onClick={handleCloseDialog}
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit}
                                            style={{
                                                backgroundColor: "#42A5F5",
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>

                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Orders />
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
