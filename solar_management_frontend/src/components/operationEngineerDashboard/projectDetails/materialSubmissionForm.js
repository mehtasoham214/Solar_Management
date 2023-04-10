import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
    Button,
    Container,
    Grid,
    FormControlLabel,
    Checkbox,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

function MaterialSubmissionForm() {
    const [rows, setRows] = useState([
        { dropdownValue: "", textInputValue: "" },
    ]);
    // Set Checkbox value
    let isChecked = false;

    const handleAddRow = () => {
        setRows([...rows, { dropdownValue: "", textInputValue: "" }]);
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

    // Handling CheckBox Value
    const handleCheckBox = (event) => {
        isChecked = event.target.checked;
    };

    // Menu Items Array
    const menuItems = [
        "Solar",
        "Wire",
        "Battery",
        "Rails",
        "Charge Controller",
        "Inverter",
        "Crew",
    ];

    // Post the data
    const handleSubmit = async () => {
        // Retrieve the data from the form
        const formData = rows.map((row) => ({
            type:
                row.dropdownValue === "Solar"
                    ? "solarType"
                    : row.dropdownValue === "Wire"
                    ? "wireType"
                    : row.dropdownValue === "Battery"
                    ? "batteryType"
                    : row.dropdownValue === "Rails"
                    ? "railsType"
                    : row.dropdownValue === "Charge Controller"
                    ? "chargeControllerType"
                    : row.dropdownValue === "Inverter"
                    ? "inverterType"
                    : row.dropdownValue === "Crew"
                    ? "crewType"
                    : undefined,
            count: row.textInputValue,
        }));
        formData.push({ type: "oeFeasible", count: isChecked });
        console.log(formData);
        try {
            const token = localStorage.getItem("token");
            const id = localStorage.getItem("projectId");
            const response = await axios.patch(
                `${process.env.REACT_APP_API_URL}projects/equipment/${id}`,
                { formData },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
                <Grid container spacing={3} marginBottom={3}>
                    <Grid item md={8}>
                        {/* <h1>Site Inspector Info</h1> */}
                        <FormControlLabel
                            value="end"
                            control={
                                <Checkbox
                                    onChange={(event) => handleCheckBox(event)}
                                />
                            }
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
                                    {menuItems.map((item) => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                sx={{ m: 1, minWidth: 200 }}
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
                <Grid item md={8}></Grid>
                <Grid
                    item
                    md={4}
                    display="flex"
                    alignItems={{
                        xs: "center",
                        md: "flex-end",
                        lg: "flex-end",
                    }}
                    justifyContent="flex-end"
                    sx={{ marginBottom: 2 }}
                >
                    <Button
                        onClick={handleSubmit}
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
