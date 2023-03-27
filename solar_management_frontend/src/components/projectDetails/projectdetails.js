import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Grid, ButtonGroup } from "@mui/material";

//Theme Imports
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function createData(title, details) {
  return { title, details };
}

const rows = [
  createData("Project Name", "Xyz"),
  createData("Address", "1728 somestreet USA")
];

function CustomizedTables() {
  return (
    <ThemeProvider theme={theme}>
    <Container sx={{border:3, borderRadius:2, borderColor:'gray'}}>
      <Grid container spacing={3} marginBottom={3}>
        <Grid item md={4}>
          <h1>Project Information</h1>
        </Grid>
        <Grid
          item
          md={8}
          display="flex"
          alignItems={{ xs: "center", md: "flex-end", lg: "flex-end" }}
          justifyContent="flex-end"
          sx={{ marginBottom: 2 }}
        >
          <ButtonGroup variant="outlined">
            <Button color="secondary">Start</Button>
            <Button color="success">Finish</Button>
            <Button color="error">Cancel</Button>
          </ButtonGroup>
        </Grid>
        <Grid item lg={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="right">Details</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.title}>
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.details}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
    </ThemeProvider>
  );
}

export default CustomizedTables;