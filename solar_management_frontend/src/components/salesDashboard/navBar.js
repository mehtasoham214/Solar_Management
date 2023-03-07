import * as React from "react";
import { mainListItems, secondaryListItems } from "./menuItems";
import {
    Avatar,
    Drawer,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    Typography,
    List
} from "@mui/material";

export default function PermanentDrawerLeft() {

    return (
        <Drawer variant="permanent">
                    <Avatar
                        sx={{ width: 80, height: 80, mx: "auto", mt: 4 }}
                    ></Avatar>
                    <Typography sx={{ mx: "auto" }} variant="subtitle1">
                        Alex
                    </Typography>
                    <Typography sx={{ mx: "auto" }} variant="subtitle2">
                        SalePerson
                    </Typography>
                    <List sx={{ mt: 8 }} component="nav">
                        {mainListItems}
                        {secondaryListItems}
                    </List>
                </Drawer>
    );

}
