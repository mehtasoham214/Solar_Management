
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../salesDashboard/Title";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

export default function Materialstable() {

  const materialsList = [{
    productName: "Product A",
    productCode: "PCABB",
    productQuantity: 10
  },{
    productName: "Product B",
    productCode: "PCABC",
    productQuantity: 5
  },{
    productName: "Product C",
    productCode: "PCABz",
    productQuantity: 15
  }]

  

  const handleProjectClick = (event) => {
      // event.preventDefault();
      // navigate("/sales/projectdetails"); // replace with the desired path
  };

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
                              <TableCell onClick={handleProjectClick}>{material.productName}</TableCell>
                              <TableCell>{material.productCode}</TableCell>
                              <TableCell>{material.productQuantity}</TableCell>
                              {/* <TableCell>{customer.projectAddress}</TableCell> */}
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </React.Fragment>
       </ThemeProvider>
  );
}
