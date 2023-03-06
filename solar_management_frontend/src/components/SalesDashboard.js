import React from "react";
import "../font.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Button from "@mui/material/Button";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

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

const SalesDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ m: 2 }}>
        <Box sx={{ display: "flex", m: 2, gap: 2 }}>
          <Card
            sx={{
              bgcolor: "#FFD9B7",
              pb: 0,
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <CardHeader
              sx={{ pb: 0 }}
              avatar={
                <Icon>
                  <InsertDriveFileIcon />
                </Icon>
              }
              title={<Typography variant="h5">On-going Projects</Typography>}
            />
            <CardContent sx={{ pt: 2, pb: 0 }}>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              bgcolor: "#FFB7B7",
              pb: 0,
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <CardHeader
              sx={{ pb: 0 }}
              avatar={
                <Icon>
                  <FactCheckIcon />
                </Icon>
              }
              title={<Typography variant="h5">Past Projects</Typography>}
            />
            <CardContent sx={{ pt: 2, pb: 0 }}>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              bgcolor: "#B7FFBE",
              pb: 0,
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <CardHeader
              sx={{ pb: 0 }}
              avatar={
                <Icon>
                  <RequestQuoteIcon />
                </Icon>
              }
              title={<Typography variant="h5">Total Projects</Typography>}
            />
            <CardContent sx={{ pt: 2, pb: 0 }}>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ m: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CreateNewFolderIcon />}
          >
            <Typography>Create New Project</Typography>
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SalesDashboard;
