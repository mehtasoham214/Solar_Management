import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Button } from "@mui/material";

function OMDropBox() {
    const [siteInspector, setSiteInspector] = useState('');
    const [operationEngineer, setOperationEngineer] = useState('');
    const [operationManager, setOperationManager] = useState('');

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
        <FormControl required sx={{ minWidth: 400 }}>
        <InputLabel id="siteInspector-label">Site Inspector</InputLabel>
        <Select
          labelId="siteInspector-label"
          id="siteInspector"
          value={siteInspector}
          label="siteInspector *"
          onChange={(e)=> setSiteInspector(e.target.value)}
        >
          <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Site Inspector"}>Site Inspector</MenuItem>
                <MenuItem value={"Sales Team"}>Sales Team</MenuItem>
                <MenuItem value={"Operations Engineer"}>Operations Engineer</MenuItem>
                <MenuItem value={"Operations Manager"}>Operations Manager</MenuItem>
                <MenuItem value={"Team Lead"}>Team Lead</MenuItem>
        </Select>
      </FormControl>
              </Grid>
              <Grid item xs={12}>
        <FormControl required sx={{ minWidth: 400 }}>
        <InputLabel id="operationEngineer-label">Operation Engineer</InputLabel>
        <Select
          labelId="operationEngineer-label"
          id="operationEngineer"
          value={operationEngineer}
          label="operationEngineer *"
          onChange={(e)=> setOperationEngineer(e.target.value)}
        >
          <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Site Inspector"}>Site Inspector</MenuItem>
                <MenuItem value={"Sales Team"}>Sales Team</MenuItem>
                <MenuItem value={"Operations Engineer"}>Operations Engineer</MenuItem>
                <MenuItem value={"Operations Manager"}>Operations Manager</MenuItem>
                <MenuItem value={"Team Lead"}>Team Lead</MenuItem>
        </Select>
      </FormControl>
              </Grid>
              <Grid item xs={12}>
        <FormControl required sx={{ minWidth: 400 }}>
        <InputLabel id="operationManager-label">Operation Manager</InputLabel>
        <Select
          labelId="operationManager-label"
          id="operationManager"
          value={operationManager}
          label="operationManager *"
          onChange={(e)=> setOperationManager(e.target.value)}
        >
          <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Site Inspector"}>Site Inspector</MenuItem>
                <MenuItem value={"Sales Team"}>Sales Team</MenuItem>
                <MenuItem value={"Operations Engineer"}>Operations Engineer</MenuItem>
                <MenuItem value={"Operations Manager"}>Operations Manager</MenuItem>
                <MenuItem value={"Team Lead"}>Team Lead</MenuItem>
        </Select>
      </FormControl>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default OMDropBox;