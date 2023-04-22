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
import { useState,useEffect } from "react";
import axios from "axios";
import AddTaskIcon from '@mui/icons-material/AddTask';
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

import FormControl from "@mui/material/FormControl";
import {
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
function RequestButton (){
    const [openDialog, setOpenDialog] = useState(false);
    const [projectid, setProjectId] = useState();
    const [projectAddress, setProjectAddress] = useState();
    const [projects, setProjects] = useState([]);
    const handleOpenDialog = () => {
        console.log("handleOpenDialog called");
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Row Vlaues
    const [rows, setRows] = useState([
        { dropdownValue: projects.length > 0 ? projects[0].projectAddress: ""},
    ]);
    useEffect(()=>{
        if(projects.length > 0) {
            setProjectId(projects[0]._id);
        }
    }, [projects]);

    // dropdown change
    const handleDropdownChange = (index) => (event) => {
        const newRows = [...rows];
        newRows[index].dropdownValue = event.target.value;
        setRows(newRows);
        setProjectAddress(event.target.value)
        const projectId = projects.find(project => project.projectAddress === event.target.value)._id;
        setProjectId(projectId);
        console.log(projectId)
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                request: request,
                projectAddress: projectAddress,
                id: projectid
            };
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}request/add`,
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
        // Get Project Address
        async function GetProjectAddress() {
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
            setProjects(data);
            }
            useEffect(() => {
                GetProjectAddress();
            }, []);
            useEffect(()=>{
                if(projects.length > 0){
                    setProjectId(projects[0]._id);
                }
            },[projects]);
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
                        {rows.map((row, index) => (
                            <Grid item xs={12} lg={4}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel>Address</InputLabel>
                                    <Select
                                        value={row.dropdownValue}
                                        onChange={handleDropdownChange(index)}
                                        label="Material"
                                    >
                                        {projects.map((item) => (
                                            <MenuItem value ={item.projectAddress} >
                                                {item.projectAddress}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
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