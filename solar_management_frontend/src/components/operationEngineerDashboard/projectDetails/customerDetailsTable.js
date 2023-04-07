import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, Grid, ButtonGroup } from "@mui/material";
import Title from "../../salesDashboard/Title";
//Theme Imports
import theme from "../../theme";
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

function CustomerDetailsTables() {
  const [customer, getcustomer] = useState();

  async function GetcustomerDetails() {
    const token = localStorage.getItem("token");
    const projectId = localStorage.getItem("projectId");
    console.log(projectId);
    console.log(token);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}customer/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = await response.data;
    getcustomer(data);
  }
  useEffect(() => {
    GetcustomerDetails();
  }, []);

  if (!customer) return <div>No Customer Found</div>;

  return (
    <ThemeProvider theme={theme}>
    <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
      <Grid container spacing={3} marginBottom={3}>
        <Grid item md={8}>
          <Title>Customer Details</Title>
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
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Customer Name
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {customer.customerName}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Customer Number
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {customer.customerNumber}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Customer Address
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {customer.customerAddress}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    Project Address
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {customer.projectAddress}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
    </ThemeProvider>
  );
}

export default CustomerDetailsTables;
