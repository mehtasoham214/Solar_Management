import * as React from "react";
import { mainListItems, secondaryListItems } from "./menuItems";
import { Avatar, Drawer, Typography, List } from "@mui/material";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

export default function SiPermanentDrawerLeft() {
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
                    Alex
                </Typography>
                <Typography sx={{ mx: "auto" }} variant="subtitle2">
                    Operation Manager
                </Typography>
                <List sx={{ mt: 8 }} component="nav">
                    {mainListItems}
                    {secondaryListItems}
                </List>
            </Drawer>
        </ThemeProvider>
    );
}
