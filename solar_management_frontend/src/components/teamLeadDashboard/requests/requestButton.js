import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

function RequestButton (){
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        console.log("handleOpenDialog called");
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                rquest: request,
                projectAddress: projectAddress,
            };
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
                window.location.reload();}
        } catch (error) {
            console.error(error);
        }
    };

    const [request, setRequest] = useState("");
    const [projectAddress, setProjectAddress] = useState("");

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
                                {/* Create Customer Button */}
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<CreateNewFolderIcon />}
                                    onClick={handleOpenDialog}
                                >
                                    <Typography>Create New Request</Typography>
                                </Button>
                                <Dialog
                                    open={openDialog}
                                    onClose={handleCloseDialog}
                                >
                                    <DialogTitle
                                        style={{ textAlign: "center" }}
                                    >
                                        Create New Request
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
                                                id="request"
                                                label="Request"
                                                variant="outlined"
                                                onChange={(e) =>
                                                    setRequest(
                                                        e.target.value
                                                    )
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AddTaskIcon
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
        </Grid>
        </Container>
        </ThemeProvider>
    );
}

export default RequestButton;