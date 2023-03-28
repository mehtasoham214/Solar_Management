//import menu designs & content
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import HomeIcon from "@mui/icons-material/Home";
import HardwareIcon from "@mui/icons-material/Hardware";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import HandymanIcon from "@mui/icons-material/Handyman";
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
            <Link to="/ops-manager" href="#">
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <HomeIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </Link>
            <Link to="/ops-manager/ongoingprojects" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <InsertDriveFileIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="On-going Projects" />
                </ListItemButton>
            </Link>
            <Link to="/ops-manager/pastprojects" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <FactCheckIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Past Projects" />
                </ListItemButton>
            </Link>
            <Link to="/ops-manager/requests" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <ThumbsUpDownIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Requests" />
                </ListItemButton>
            </Link>
            <Link to="/ops-manager/equipments" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <HardwareIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Equipments" />
                </ListItemButton>
            </Link>
            <Link to="/ops-manager/operationengineer" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <EngineeringIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Operation Engineer" />
                </ListItemButton>
            </Link>
            <Link to="/ops-manager/siteinspector" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <ManageAccountsIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Site Inspector" />
                </ListItemButton>
            </Link>
            <Link to="/ops-manager/sales" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <PriceChangeIcon sx={{ color: "primary.main" }} />
                    </ListItemIcon>
                    <ListItemText primary="Sales" />
                </ListItemButton>
            </Link>
            <Link to="/ops-manager/teamlead" href="#" sx={{ mt: 3 }}>
                <ListItemButton sx={{ color: "primary.main" }}>
                    <ListItemIcon>
                        <HandymanIcon sx={{ color: "primary.main" }} />
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
            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </React.Fragment>
    </ThemeProvider>
);
