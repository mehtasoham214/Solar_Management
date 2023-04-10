import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";

function OMDropBox() {
    //UserTypedata represents Names of users coming from backend
    const [siteInspectordata, getSiteInspectordata] = useState([]);
    const [operationEngineerdata, getOperationEngineerdata] = useState([]);
    const [teamLeaddata, getteamLeaddata] = useState([]);
    const [siteInspector, setSiteInspector] = useState("");
    const [operationEngineer, setOperationEngineer] = useState("");
    const [teamLead, setteamLead] = useState("");

    //Handling Submit Button adding staff to project
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const projectId = localStorage.getItem("projectId");
            const data = {
                siteInspector: siteInspector,
                operationEngineer: operationEngineer,
                teamLead: teamLead,
            };
            const response = await axios.patch(
                `${process.env.REACT_APP_API_URL}projects/addStaff/${projectId}`,
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

    //Getting siteInspector,operationEngineer,teamLead from backend
    async function GetSiteInspector() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}getsiteinspectors`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.data;
            getSiteInspectordata(data);
        } catch (error) {
            console.log(error);
        }
    }
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
            getOperationEngineerdata(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function GetTeamLead() {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}getteamlead`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.data;
            getteamLeaddata(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetSiteInspector();
        GetOperationsEngineer();
        GetTeamLead();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl required sx={{ minWidth: 400 }}>
                                <InputLabel id="siteInspector-label">
                                    Site Inspector
                                </InputLabel>
                                <Select
                                    labelId="siteInspector-label"
                                    id="siteInspector"
                                    value={siteInspector}
                                    label="siteInspector *"
                                    onChange={(e) =>
                                        setSiteInspector(e.target.value)
                                    }
                                >
                                    <MenuItem value="Not Assigned">
                                        <em>None</em>
                                    </MenuItem>
                                    {siteInspectordata.map((user) => (
                                        <MenuItem
                                            key={user.username}
                                            value={user.username}
                                        >
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required sx={{ minWidth: 400 }}>
                                <InputLabel id="operationEngineer-label">
                                    Operation Engineer
                                </InputLabel>
                                <Select
                                    labelId="operationEngineer-label"
                                    id="operationEngineer"
                                    value={operationEngineer}
                                    label="operationEngineer *"
                                    onChange={(e) =>
                                        setOperationEngineer(e.target.value)
                                    }
                                >
                                    <MenuItem value="Not Assigned">
                                        <em>None</em>
                                    </MenuItem>
                                    {operationEngineerdata.map((user) => (
                                        <MenuItem
                                            key={user.username}
                                            value={user.username}
                                        >
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl required sx={{ minWidth: 400 }}>
                                <InputLabel id="teamLead-label">
                                    Team Lead
                                </InputLabel>
                                <Select
                                    labelId="teamLead-label"
                                    id="teamLead"
                                    value={teamLead}
                                    label="teamLead *"
                                    onChange={(e) =>
                                        setteamLead(e.target.value)
                                    }
                                >
                                    <MenuItem value="Not Assigned">
                                        <em>None</em>
                                    </MenuItem>
                                    {teamLeaddata.map((user) => (
                                        <MenuItem
                                            key={user.username}
                                            value={user.username}
                                        >
                                            {user.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default OMDropBox;
