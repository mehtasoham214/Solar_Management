// import React from 'react';
// import {useState,  useEffect} from "react";
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';



// const ProductTable = () => {
//   const [materiallist, setMaterialList] = useState([]);
//   async function getLeads() {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}materials`,
//           {
//               headers: {
//                   Authorization: `Bearer ${token}`,
//               }
//           }
//       );
//       setMaterialList(response.data);
//   }
//   useEffect(() => {
//       getLeads();
//   }, []);
//   if (!materiallist) return (<div>No Leads Found</div>)

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Product Name</TableCell>
//             <TableCell align="right">Product Code</TableCell>
//             <TableCell align="right">Quantity</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {materiallist.map((material, index) => (
//             <TableRow key={index}>
//               <TableCell component="th" scope="row">
//                 {material.type}
//               </TableCell>
//               <TableCell align="right">{material.product_code}</TableCell>
//               <TableCell align="right">{material.quantity}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const DropdownAndTable = () => {

//   return (
//     <div>
//       <ProductTable />
//     </div>
//   );
// };

// export default DropdownAndTable;

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../salesDashboard/Title";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Materialstable() {

// Get Materials Data
  const [materialsList, setMaterialsList] = useState([]);
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
      setMaterialsList(response.data);
  }
  useEffect(() => {
      getLeads();
  }, []);
  if (!materialsList) return (<div>No Materials Found</div>)


  return (
      <ThemeProvider theme={theme}>
          <React.Fragment>
              <Title>Materials List</Title>
              <Table size="small">
                  <TableHead>
                      <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Product Code</TableCell>
                          <TableCell>Quantity</TableCell>
                          {/* <TableCell>Project Address</TableCell> */}
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {materialsList.map((material) => (
                          <TableRow >
                              <TableCell>{material.product_name}</TableCell>
                              <TableCell>{material.product_code}</TableCell>
                              <TableCell>{material.quantity}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </React.Fragment>
       </ThemeProvider>
  );
}
