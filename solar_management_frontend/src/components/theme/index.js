import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0d0d0d",
        },
        secondary: {
            main: "#f5f5f5",
        },
        error: {
            main: "#f44336",
        },
        warning: {
            main: "#FFC107",
        },
        success: {
            main: "#4caf50",
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
                        backgroundColor: "#AAA",
                        borderColor: "#fff",
                        color: "#fff",
                    },
                },
                outlinedSecondary: {
                    color: "#3f51b5",
                    backgroundColor: "transparent",
                    borderWidth: "3px",
                    borderColor: "#3f51b5",
                    "&:hover": {
                        backgroundColor: "#3f51b5",
                        borderColor: "#fff",
                        color: "#fff",
                    },
                },
                outlinedError: {
                    color: "#f44336",
                    backgroundColor: "transparent",
                    borderWidth: "3px",
                    borderColor: "#f44336",
                    "&:hover": {
                        backgroundColor: "#f44336",
                        borderColor: "#fff",
                        color: "#fff",
                    },
                },
                outlinedSuccess: {
                    color: "#4caf50",
                    backgroundColor: "transparent",
                    borderWidth: "3px",
                    borderColor: "#4caf50",
                    "&:hover": {
                        backgroundColor: "#4caf50",
                        borderColor: "#fff",
                        color: "#fff",
                    },
                },
            },
        },
    },
});

export default theme;