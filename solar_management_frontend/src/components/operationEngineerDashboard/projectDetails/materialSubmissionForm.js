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
import { Button, Container, Grid, ButtonGroup, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
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


function MaterialSubmissionForm() {
  // const [customer, getcustomer] = useState();

  // async function GetcustomerDetails() {
  //   const token = localStorage.getItem("token");
  //   const projectId = localStorage.getItem("projectId");
  //   console.log(projectId);
  //   console.log(token);
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_API_URL}customer/${projectId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   );
  //   const data = await response.data;
  //   getcustomer(data);
  // }
  // useEffect(() => {
  //   GetcustomerDetails();
  // }, []);

  // if (!customer) return <div>No Customer Found</div>;
  const [rows, setRows] = useState([{ dropdownValue: '', textInputValue: '' }]);

  const handleAddRow = () => {
    setRows([...rows, { dropdownValue: '', textInputValue: '' }]);
  };

  const handleDropdownChange = (index) => (event) => {
    const newRows = [...rows];
    newRows[index].dropdownValue = event.target.value;
    setRows(newRows);
  };

  const handleTextInputChange = (index) => (event) => {
    const newRows = [...rows];
    newRows[index].textInputValue = event.target.value;
    setRows(newRows);
  };

  return (
    <ThemeProvider theme={theme}>
    <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
      <Grid container spacing={3} marginBottom={3}>
        <Grid item md={8}>
          {/* <h1>Site Inspector Info</h1> */}
          <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="Feasible"
          labelPlacement="end"
        />
        </Grid>
        {rows.map((row, index) => (
        <Grid item lg={8}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
             <InputLabel>Material</InputLabel>
             <Select
                value={row.dropdownValue}
                onChange={handleDropdownChange(index)}
                label="Material"
             >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </FormControl>
          <TextField sx={{ m: 1, minWidth: 200 }}
            style={{ flex: 1 }}
            label="Quantity"
            type="number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={row.textInputValue}
            onChange={handleTextInputChange(index)}
          />
        </Grid>
      ))}
      </Grid>
      <Grid item md={8}>
      <Button onClick={handleAddRow} startIcon={<AddIcon />}>
        Add
      </Button>
      </Grid>
      <Grid item md={8}>
      
      </Grid>
      <Grid item md={4}
        display="flex"
        alignItems={{
            xs: "center",
            md: "flex-end",
            lg: "flex-end",
        }}
        justifyContent="flex-end"
        sx={{ marginBottom: 2 }}>
      <Button
      onClick={handleAddRow}
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      >
      Submit
      </Button>
      </Grid>
    </Container>
    </ThemeProvider>
  );
}

export default MaterialSubmissionForm;
