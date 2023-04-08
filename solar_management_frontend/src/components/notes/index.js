import * as React from "react";
import {useState, useEffect} from "react";
import axios from 'axios'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../salesDashboard/Title";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function NotesTable() {

  const notesList = [{
    note: "Some sample note that can take a good amount of space that may be more than two lines Some sample note that can take a good amount of space that may be more than two lines Some sample note that can take a good amount of space that may be more than two lines",
    poster: "Alex",
    date: "10/10/2022"
  },{
    note: "Some sample note that can take a good amount of space that may be more than two lines",
    poster: "Sam",
    date: "05/07/2022"
  },{
    note: "Some sample note that can take a good amount of space that may be more than two lines",
    poster: "John",
    date: "10/02/2023"
  }]

  

  const handleProjectClick = (event) => {
      // event.preventDefault();
      // navigate("/sales/projectdetails"); // replace with the desired path
  };

  return (
      <ThemeProvider theme={theme}>
          <React.Fragment>
              <Title>Notes</Title>
              <Table >
                  <TableHead>
                      <TableRow>
                          <TableCell>Note</TableCell>
                          <TableCell>Posted By</TableCell>
                          <TableCell>Date</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {notesList.map((note) => (
                          <TableRow >
                              <TableCell onClick={handleProjectClick}>{note.note}</TableCell>
                              <TableCell>{note.poster}</TableCell>
                              <TableCell>{note.date}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </React.Fragment>
       </ThemeProvider>
  );
}
