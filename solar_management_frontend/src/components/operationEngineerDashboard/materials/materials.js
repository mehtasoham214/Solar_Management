import React from 'react';
import {useState,  useEffect} from "react";
import axios from 'axios';
// import { makeStyles } from '@mui/styles';
// import { makeStyles } from '@mui/material';
// import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '20px',
//   },
//   horizontalStack: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     padding: '12px',
//     boxSizing: 'border-box',
//     marginBottom: '12px',
//   },
//   dropdown: {
//     width: '50%',
//     marginRight: '20px',
//   },
//   search: {
//     width: '50%',
//   },
// });

const dummyData = [
  { name: 'Product 1', code: 'ABC123', quantity: 10 },
  { name: 'Product 2', code: 'DEF456', quantity: 5 },
  { name: 'Product 3', code: 'GHI789', quantity: 2 },
];

// const DropdownAndSearch = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.horizontalStack}>
//       <FormControl className={classes.dropdown}>
//         <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={''}
//           label="Filter"
//         >
//           <MenuItem value={'name'}>Name</MenuItem>
//           <MenuItem value={'code'}>Code</MenuItem>
//           <MenuItem value={'quantity'}>Quantity</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField className={classes.search} label="Search" variant="outlined" />
//     </div>
//   );
// };

const ProductTable = () => {
  const [materiallist, setMaterialList] = useState([]);
  async function getLeads() {
      const token = localStorage.getItem("token");
      const response = await axios.get(
          `${process.env.REACT_APP_API_URL}materials`,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          }
      );
      setMaterialList(response.data);
  }
  useEffect(() => {
      getLeads();
  }, []);
  if (!materiallist) return (<div>No Leads Found</div>)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Product Code</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materiallist.map((material, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {material.type}
              </TableCell>
              <TableCell align="right">{material.product_code}</TableCell>
              <TableCell align="right">{material.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const DropdownAndTable = () => {

  return (
    <div>
      <ProductTable />
    </div>
  );
};

export default DropdownAndTable;