//import counter
import * as React from "react";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import { Box } from "@mui/system";

export default function Counter({ title, icon, count }) {
  return (
    <React.Fragment>
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
