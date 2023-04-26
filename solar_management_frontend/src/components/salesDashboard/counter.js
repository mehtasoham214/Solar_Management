//React imports
import * as React from "react";

//Material UI imports
import { Typography, Icon, Box } from "@mui/material";

export default function Counter({ title, icon, count }) {
    return (
        <React.Fragment>
            {/* Counter display */}
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Icon>{icon}</Icon>
                <Typography variant="h5" sx={{ ml: 2 }}>
                    {title}
                </Typography>
            </Box>
            <Typography variant="h4" sx={{ mt: 3 }}>
                {count}
            </Typography>
        </React.Fragment>
    );
}
