import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { mainListItems, secondaryListItems } from "./menuItems";
import { Avatar, Drawer, Typography, List } from "@mui/material";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

export default function OEPermanentDrawerLeft() {
    const [userposition, getuserposition] = useState();
    const [userName, getuserName] = useState();
    async function GetUserInfo() {
        const token = localStorage.getItem("token");
        debugger;
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
        getuserposition(data.position);
    }
    useEffect(() => {
        GetUserInfo();
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
                    {userName}
                </Typography>
                <Typography sx={{ mx: "auto" }} variant="subtitle2">
                    {userposition}
                </Typography>
                <List sx={{ mt: 8 }} component="nav">
                    {mainListItems}
                    {secondaryListItems}
                </List>
            </Drawer>
        </ThemeProvider>
    );
}
