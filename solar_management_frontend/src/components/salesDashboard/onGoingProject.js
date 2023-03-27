import * as React from "react";
import {useState,  useEffect} from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
//import { Button } from "@mui/material";

// Generate Order Data



export default function OngoingProject({ showMoreLink = true }) {
    const navigate = useNavigate();

    const handleSeeMoreClick = (event) => {
        event.preventDefault();
        navigate("/ongoingprojects"); // replace with the desired path
     };

function ButtonArray() {
    const buttonArray = ["Edit", "Done", "Delete"];

    return (
        <div>
            {/* <EditButton>buttonArray[0]</EditButton>
              <button >buttonArray[0]</button>
              <button >buttonArray[0]</button> */}

            {buttonArray.map((buttonText, index) => (
                <button style={{ marginLeft: "10px" }} key={index}>
                    {buttonText}
                </button>
            ))}
        </div>
    );
}

const [projectlist, setemployees] = useState(null)
    useEffect(() => {
        getemployees()
    }, [])
    const getemployees = () => {
        fetch("http://localhost:3000/inprogress")
            .then(res => res.json())
            .then(
                (result) => {                    
                    setemployees(result)
                },
                (error) => {
                    setemployees(null);
                }
            )
    }

    if (!projectlist) return (<div>No Record Found</div>)



const rows = ButtonArray();

    const handleProjectClick = (event) => {
        event.preventDefault();
        navigate("/sales/projectdetails"); // replace with the desired path
    };

    
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Title>On-Going Projects</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectlist.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell onClick={handleProjectClick}>{row.ProductName}</TableCell>
                                <TableCell>{row.CustomerName}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{`$${row.cost}`}</TableCell>

                                <TableCell
                                    style={{
                                        color:
                                            row.projectStatus === "Pending"
                                                ? theme.palette.error.main
                                                : row.projectStatus === "In-Progress"
                                                ? theme.palette.warning.main
                                                : "",
                                    }}
                                >
                                    {row.projectStatus}
                                </TableCell>
                                <TableCell>{rows}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {showMoreLink && (
                <Link
                    color="primary"
                    href="#"
                    onClick={handleSeeMoreClick}
                    sx={{ mt: 3 }}
                >
                    See more Projects
                </Link>)}
            </React.Fragment>
        </ThemeProvider>
    );
}