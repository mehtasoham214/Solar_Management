//React imports
import * as React from "react";
import { useState, useEffect } from "react";

//Axios imports
import axios from "axios";

//Material UI imports
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

//Theme imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

export default function AddEmployee() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (
                position === "" ||
                username === "" ||
                email === "" ||
                staffname === "" ||
                contact === "" ||
                password === ""
            ) {
                alert("Please enter all details");
                return;
            }
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}addNewStaff`,
                {
                    username: username,
                    staffname: staffname,
                    email: email,
                    position: position,
                    contact: contact,
                    password: password,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await response.data;
            if (data === "User Created Successfully") {
                alert("User Created Successfully");
                // Send login details to user
                const subject = `Congratualtions on your new role as ${position}`;
                const body = `Dear ${staffname},\n\nHere is your username: ${username} \n\nHere is your password: ${password} \n\n Best Regards,\n ${userName} \nOperations Manager`;
                const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
                    subject
                )}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoLink;
                if (position === "Site Inspector") {
                    window.location.href = "/ops-manager/siteInspector";
                } else if (position === "Sales Team") {
                    window.location.href = "/ops-manager/sales";
                } else if (position === "Team Lead") {
                    window.location.href = "/ops-manager/teamlead";
                } else if (position === "Operations Engineer") {
                    window.location.href = "/ops-manager/operationengineer";
                } else {
                    window.location.href = "/ops-manager";
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [userName, getuserName] = useState();
    async function GetUserInfo() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}userInfo`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.data;
        getuserName(data.name);
    }
    useEffect(() => {
        GetUserInfo();
    }, []);

    const [position, setPosition] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [staffname, setStaffName] = useState("");
    const [contact, setContactNumber] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ThemeProvider theme={theme}>
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
                    {/* Adding new employees form */}
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="staffname"
                                    label="Full Name"
                                    autoFocus
                                    placeholder="e.g. John Doe"
                                    onChange={(e) =>
                                        setStaffName(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="e.g. JohnDoe123"
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="password"
                                    placeholder="Enter a safe password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    type="Email"
                                    label="Email Address"
                                    id="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required sx={{ minWidth: 400 }}>
                                    <InputLabel id="position-label">
                                        Position
                                    </InputLabel>
                                    <Select
                                        labelId="position-label"
                                        id="position"
                                        value={position}
                                        label="Position *"
                                        onChange={(e) =>
                                            setPosition(e.target.value)
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Site Inspector"}>
                                            Site Inspector
                                        </MenuItem>
                                        <MenuItem value={"Sales Team"}>
                                            Sales Team
                                        </MenuItem>
                                        <MenuItem value={"Operations Engineer"}>
                                            Operations Engineer
                                        </MenuItem>
                                        <MenuItem value={"Team Lead"}>
                                            Team Lead
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="contactNumber"
                                    label="Contact Number"
                                    type="number"
                                    id="contactNumber"
                                    autoComplete="contactNumber"
                                    placeholder="e.g. +11234567890"
                                    onChange={(e) =>
                                        setContactNumber(e.target.value)
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
