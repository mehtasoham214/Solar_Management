import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import theme from "../theme";
import FormControl from "@mui/material/FormControl";

export default function Register() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        position,
                        username,
                        password,
                        staffname,
                        contact,
                    }),
                }
            );
            const data = await response.json();
            if (data.createdUserData === "User Created Successfully") {
                alert("User Created Successfully");
                window.location.href = "/";
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [position, setPosition] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [staffname, setStaffName] = useState("");
    const [contact, setContactNumber] = useState("");

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
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                                        <MenuItem value={"Operations Manager"}>
                                            Operations Manager
                                        </MenuItem>
                                        <MenuItem value={"Team Lead"}>
                                            Team Lead
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
                        <Grid container>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
