import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { mainListItems, secondaryListItems } from "./menuItems";
import Deposits from "./counter";
import Orders from "./project";
import Button from "@mui/material/Button";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Avatar, Drawer, Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#880e4f",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        outlinedPrimary: {
          color: "#AAA",
          backgroundColor: "#transparent",
          borderWidth: "3px",
          borderColor: "#AAAAAA",
          "&:hover": {
            backgroundColor: "#cdcdcd",
            borderColor: "#fff",
            color: "#fff",
          },
        },
        outlinedSecondary: {
          color: "#fff",
          backgroundColor: "#880e4f",
          borderColor: "#880e4f",
          "&:hover": {
            backgroundColor: "#4a148c",
            borderColor: "#4a148c",
            color: "#fff",
          },
        },
      },
    },
  },
});

function SalesDashboardContent() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", mt: 2}}>
        <Drawer variant="permanent">
           <Avatar
              sx={{ width: 80, height: 80,mx: 'auto',mt: 4}}>
           </Avatar>
           <Typography sx={{mx: 'auto'}} variant="subtitle1">
            Alex
           </Typography>
           <Typography sx={{mx: 'auto'}} variant="subtitle2">
            SalePerson
           </Typography>
         <List sx={{mt: 8}} component="nav">
          {mainListItems}
          {/* <Divider sx={{ my: 1 }} /> */}
          {secondaryListItems}
         </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            ml: 28,
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {/* Counter */}
              <Grid item xs={12} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Counter */}
              <Grid item xs={12} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Counter */}
              <Grid item xs={12} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              <Box sx={{ m: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<CreateNewFolderIcon />}
                >
                  <Typography>Create New Project</Typography>
                </Button>
              </Box>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <SalesDashboardContent />;
}
