import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import { useState, useEffect } from "react";

export default function NotesTable() {
    const [openDialog, setOpenDialog] = useState(false);
    const [postedNote, setPostedNote] = useState("");
    const [notesList, setNotesList] = useState([]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const projectId = localStorage.getItem("projectId");
            const data = {
                postedNote: postedNote,
                projectId: projectId,
            };
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}postnotes`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("Note Added Successfully");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function getNotes() {
        try {
            const projectId = localStorage.getItem("projectId");
            const token = localStorage.getItem("token");
            const path = `${process.env.REACT_APP_API_URL}notes/${projectId}`;
            const response = await axios.get(`${path}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setNotesList(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNotes();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
                <React.Fragment>
                    <Grid container spacing={3} marginBottom={3}>
                        <Grid item md={4}>
                            <h1>Notes</h1>
                        </Grid>
                        <Grid
                            item
                            md={8}
                            display="flex"
                            alignItems={{
                                xs: "center",
                                md: "center",
                                lg: "center",
                            }}
                            justifyContent="flex-end"
                            sx={{ marginBottom: 2 }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleOpenDialog}
                            >
                                Add Note
                            </Button>
                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                            >
                                <DialogTitle style={{ textAlign: "center" }}>
                                    Add Note
                                </DialogTitle>
                                <DialogContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "16px",
                                            mt: "20px",
                                        }}
                                    >
                                        <TextField
                                            id="notes"
                                            label="Notes"
                                            variant="outlined"
                                            multiline
                                            onChange={(e) =>
                                                setPostedNote(e.target.value)
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CreateIcon
                                                            sx={{
                                                                color: "action.active",
                                                                m: 0.5,
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCloseDialog}
                                        color="primary"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleSubmit}
                                        color="secondary"
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                    {notesList.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>Notes</b>
                                    </TableCell>
                                    <TableCell sx={{ width: "12%" }}>
                                        <b>Posted By</b>
                                    </TableCell>
                                    <TableCell sx={{ width: "10%" }}>
                                        <b>Date</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notesList.map((note) => (
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                maxWidth: "60px",
                                                minWidth: "5px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "normal",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {note.note}
                                        </TableCell>
                                        <TableCell>{note.postedby}</TableCell>
                                        <TableCell>{note.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No Notes Posted yet</p>
                    )}
                </React.Fragment>
            </Container>
        </ThemeProvider>
    );
}
