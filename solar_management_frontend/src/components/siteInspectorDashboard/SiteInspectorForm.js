import * as React from "react";
import { Box } from "@mui/system";

import {
    Button,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Container,
    Grid,
    Stack,
    FormGroup,
    Checkbox,
    FormHelperText
} from "@mui/material";

  
export default function SiteInspectorForm() {
  const [state, setState] = React.useState({
    Environmental: true,
    Building: false,
    Electrical: false,
    Zone: false,
    LandUse: false,
    Interconnection_Agreement: false,
    NetMetering_Agreement: false,
    PropertyEasement_Agreement: false,
    HOA_Approval: false,
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
 
  };
    return (
      
      
        <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid item xs={6} md={8}>
                    <div>
                        <TextField
                            helperText="Sqft"
                            id="outlined-basic"
                            label="BackYard Info"
                            variant="outlined"
                        />
                    </div>
                </Grid>
                <Grid item xs={6} md={8}>
                    <div>
                        <TextField
                            helperText="Sqft"
                            id="outlined-basic"
                            label="Roof Info"
                            variant="outlined"
                        />
                    </div>
                </Grid>
                <Grid item xs={6} md={8}>
                    <item>
                        <FormControl
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <RadioGroup
                                sx={{ display: "flex", flexDirection: "row" }}
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="On-Grid"
                                name="radio-buttons-group"
                            >
                                <div>
                                    <Stack direction="row" spacing={2}>
                                        <FormLabel id="demo-radio-buttons-group-label">
                                            Grid Type
                                        </FormLabel>
                                        <FormControlLabel
                                            value="On-Grid"
                                            control={<Radio />}
                                            label="On-Grid"
                                        />
                                        <FormControlLabel
                                            value="Off-Grid"
                                            control={<Radio />}
                                            label="Off-Grid"
                                        />
                                        <FormControlLabel
                                            value="Hybrid"
                                            control={<Radio />}
                                            label="Hybrid"
                                        />
                                    </Stack>
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </item>
                </Grid>

                <div>
                    <Grid item xs={6} md={8}>
                        <div>
                            <TextField
                                helperText="Watts/Sqft"
                                id="outlined-basic"
                                label="Irradiance"
                                variant="outlined"
                            />
                        </div>
                    </Grid>

                    <FormControl
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <RadioGroup
                            sx={{ display: "flex", flexDirection: "row" }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Yes"
                            name="radio-buttons-group"
                        >
                            <Stack direction="row" spacing={2}>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    Meter Compatibility
                                </FormLabel>
                                <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="No"
                                    control={<Radio />}
                                    label="No"
                                />
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        helperText="Lat-Long"
                        id="outlined-basic"
                        label="Co-ordinates"
                        variant="outlined"
                    />
                </div>

                <Grid item xs={6} md={8}>

                  <item>
                <FormControl  component="fieldset" variant="standard">
        <FormLabel component="legend"  >Permits</FormLabel>
        <FormGroup>
        <FormControlLabel
            control={
              <Checkbox  sx={{ m: 3 }} onChange={handleChange} name="Environmental" />
            }
            label="Environmental"
          />
           <FormControlLabel
            control={
              <Checkbox sx={{ m: 3 }} onChange={handleChange} name="Building" />
            }
            label="Building"
          />
             <FormControlLabel
            control={
              <Checkbox sx={{ m: 3 }} onChange={handleChange} name="Electrical" />
            }
            label="Electrical"
          />
          <FormControlLabel
            control={
              <Checkbox sx={{ m: 3 }} onChange={handleChange} name="Zone" />
            }
            label="Zone"
          />
            <FormControlLabel
            control={
              <Checkbox  sx={{ m: 3 }} onChange={handleChange} name="LandUse" />
            }
            label="Land Use"
          />
             <FormControlLabel
            control={
              <Checkbox  sx={{ m: 3 }} onChange={handleChange} name="Interconnection_Agreement" />
            }
            label="Interconnection Agreement"
          />
            <FormControlLabel
            control={
              <Checkbox  sx={{ m: 3 }} onChange={handleChange} name="NetMetering_Agreement" />
            }
            label="Net Metering Agreement"
          />
           <FormControlLabel
            control={
              <Checkbox  sx={{ m: 3 }} onChange={handleChange} name="PropertyEasement_Agreement" />
            }
            label="Property Easement Agreement"
          />
           <FormControlLabel
            control={
              <Checkbox  sx={{ m: 3 }} onChange={handleChange} name="HOA_Approval" />
            }
            label="HOA Approval"
          />


           </FormGroup>
        
      </FormControl>
      </item>
                </Grid>

                <div>
                    <FormControl>
                        <RadioGroup
                            sx={{ display: "flex", flexDirection: "row" }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Yes"
                            name="radio-buttons-group"
                        >
                            <Stack direction="row" spacing={2}>
                                <FormLabel
                                    sx={{ display: "inline-flex" }}
                                    id="demo-radio-buttons-group-label"
                                    value="start"
                                >
                                    Feasibility
                                </FormLabel>
                                <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="No"
                                    control={<Radio />}
                                    label="No"
                                />
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Yes"
                            name="radio-buttons-group"
                        >
                            <Stack direction="row" spacing={2}>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    Structural Feasibility
                                </FormLabel>

                                <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Yes"
                                />
                                <FormControlLabel
                                    value="No"
                                    control={<Radio />}
                                    label="No"
                                />
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div>
                    <Button variant="contained">Upload Photos</Button>
                </div>
            </Box>
        </Container>
    );
}
