//import menu designs & content
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeIcon from "@mui/icons-material/Home";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";

const handleLogout = () => {
    axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}logout`,
        withCredentials: true,
    })
        .then((res) => {
            localStorage.removeItem("token");
            window.location.href = "/"; // Navigate to the login page
        })
        .catch((err) => {
            console.log(err);
        });
};

export const mainListItems = (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            <Link to="/sales" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <HomeIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </Link>
            <Link to="/sales/ongoingprojects" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <InsertDriveFileIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="On-going Projects" />
                </ListItemButton>
            </Link>
            <Link to="/sales/pastprojects" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <FactCheckIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Past Projects" />
                </ListItemButton>
            </Link>
            <Link to="/sales/customers" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <PeopleIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItemButton>
            </Link>
            <Link to="/sales/leads" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <LeaderboardIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Leads" />
                </ListItemButton>
            </Link>
        </React.Fragment>
    </ThemeProvider>
);

export const secondaryListItems = (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            <ListItemButton sx={{ mt: 15 }} onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </React.Fragment>
    </ThemeProvider>
);
