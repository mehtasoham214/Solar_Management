//import menu designs & content
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import HardwareIcon from '@mui/icons-material/Hardware';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
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
            <Link>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <MoreTimeIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Request Delay" />
                </ListItemButton>
            </Link>
            <Link>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <HardwareIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Request Material" />
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
