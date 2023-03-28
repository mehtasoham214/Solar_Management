import * as React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { mainListItems, secondaryListItems } from "./menuItems";
import { Avatar, Drawer, Typography, List } from "@mui/material";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

export default function PermanentDrawerLeft() {
    const [userInfo, setUserInfo] = useState([]);
    async function getLeads() {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}userinfo`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        setUserInfo(response.data);
    }
    useEffect(() => {
        getLeads();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Drawer variant="permanent">
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mt: 4,
                        bgcolor: "primary.main",
                    }}
                ></Avatar>
                <Typography sx={{ mx: "auto" }} variant="subtitle1">
                    {userInfo.name}
                </Typography>
                <Typography sx={{ mx: "auto" }} variant="subtitle2">
                    {userInfo.position}
                </Typography>
                <List sx={{ mt: 8 }} component="nav">
                    {mainListItems}
                    {secondaryListItems}
                </List>
            </Drawer>
        </ThemeProvider>
    );
}
