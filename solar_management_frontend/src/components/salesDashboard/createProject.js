import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";


function CreateNewProject() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {showForm ? (
        <Box>
          <Typography variant="h6" gutterBottom>
            Create New Customer
          </Typography>
          <form>
            <TextField
              required
              fullWidth
              label="Name"
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Residential Address</InputLabel>
              <Select label="Residential Address">
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Project Address</InputLabel>
              <Select label="Project Address">
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
              </Select>
            </FormControl>
          </form>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="outlined" onClick={handleHideForm}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" sx={{ ml: 1 }}>
              Create
            </Button>
          </Box>
        </Box>
      ) : (
        <Button variant="outlined" onClick={handleShowForm}>
          Create New Customer
        </Button>
      )}
    </Box>
  );
}

export default CreateNewProject;
