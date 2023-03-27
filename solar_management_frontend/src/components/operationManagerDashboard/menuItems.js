//import menu designs & content
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const mainListItems = (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            <Link to="/" href="#" sx={{ mt: 3}}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <HomeIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </Link>
            <Link to="/ongoingprojects" href="#" sx={{ mt: 3}}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <InsertDriveFileIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="On-going Projects" />
                </ListItemButton>
            </Link>
            <Link to="/pastprojects" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <FactCheckIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Past Projects" />
                </ListItemButton>
            </Link>
            <Link>
            <ListItemButton sx={{ color: "primary.main" }}>
                <ListItemIcon>
                    <PersonIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Operation Engineer" />
            </ListItemButton>
            </Link>
            <Link>
            <ListItemButton sx={{ color: "primary.main" }}>
                <ListItemIcon>
                    <PersonIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Site Inspector" />
            </ListItemButton>
            </Link>
            <Link>
            <ListItemButton sx={{ color: "primary.main" }}>
                <ListItemIcon>
                    <PersonIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Sales" />
            </ListItemButton>
            </Link>
            <Link>
            <ListItemButton sx={{ color: "primary.main" }}>
                <ListItemIcon>
                    <PersonIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Team Lead" />
            </ListItemButton>
            </Link>
        </React.Fragment>
    </ThemeProvider>
);

export const secondaryListItems = (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            <ListItemButton sx={{ mt: 30 }}>
                <ListItemIcon>
                    <LogoutIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </React.Fragment>
    </ThemeProvider>
);