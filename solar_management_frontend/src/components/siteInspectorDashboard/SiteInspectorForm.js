import * as React from "react";
import { Box } from "@mui/system";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import Title from "../salesDashboard/Title";
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
  FormHelperText,
} from "@mui/material";

export default function SiteInspectorForm() {
  return (
    <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
        
         <Grid item md={8}>
          <Title>Site Inspector Info</Title>
        </Grid>
 
        <Grid item xs={12
        } md={8}>
            <TextField
              helperText="Sqft"
              id="outlined-basic"
              label="BackYard Info"
              variant="outlined"
            />
        </Grid>
        <Grid item xs={12} md={8}>
            <TextField
              helperText="Sqft"
              id="outlined-basic"
              label="Roof Info"
              variant="outlined"
            />
        </Grid>
       
        
               
                  <Stack direction="row" spacing={2}>
                  <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Grid Type</FormLabel>
            <RadioGroup
                row
                name="Grid Type"
            >
                <FormControlLabel value="On-Grid" control={<Radio />} label="On-Grid" />
                <FormControlLabel value="Off-Grid" control={<Radio />} label="Off-Grid" />
                <FormControlLabel value="Hybrid" control={<Radio />} label="Hybrid" />
            </RadioGroup>
        </FormControl>
        </Grid>
                  
                  </Stack>
                
         

        <div>
          <Grid item xs={6} md={8}>
              <TextField
                helperText="Watts/Sqft"
                id="outlined-basic"
                label="Irradiance"
                variant="outlined"
              />
          </Grid>
          <Stack direction="row" spacing={2}>
                  <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px', alignItems:'center' }}>Meter Compatibility </FormLabel>
            <RadioGroup
                row
                name="Meter Compatibility"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              
            </RadioGroup>
        </FormControl>
        </Grid>
                  
                  </Stack>
         
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
          
            <FormControl component="fieldset" variant="standard" >
              <FormLabel component="legend">Permits</FormLabel>
              <FormGroup>
                <Grid item xs={12}>
                  <FormControl
                    sx={{
                      m: 3,
                      display: "flex",
                     
                      alignItems: "flex-Start",
                    }}
                  >
              
                  <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Environment</FormLabel>
            <RadioGroup
                row
                name="Environment"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>
        
            
        <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Building </FormLabel>
            <RadioGroup
                row
                name="Building"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>
                 
        <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Electrical </FormLabel>
            <RadioGroup
                row
                name="Electrical"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Zone </FormLabel>
            <RadioGroup
                row
                name="Zone"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>LandUse </FormLabel>
            <RadioGroup
                row
                name="LandUse"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Interconnection Agreement </FormLabel>
            <RadioGroup
                row
                name="Interconnection Agreement"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>

        <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Net Metering Agreement </FormLabel>
            <RadioGroup
                row
                name="Net Metering Agreement"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Propery Easement Agreement </FormLabel>
            <RadioGroup
                row
                name="Property Easement Agreement"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>

        <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>HOA Approval </FormLabel>
            <RadioGroup
                row
                name="HOA Approval"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Not required" control={<Radio />} label="Not required" />
            </RadioGroup>

            

        </FormControl>
        </Grid>




                  
                  </FormControl>
                </Grid>
              </FormGroup>
            </FormControl>
         
        </Grid>

      
                  <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Feasibility</FormLabel>
            <RadioGroup
                row
                name="feasibility"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
               
            </RadioGroup>
        </FormControl>
        </Grid>
                  
               

                
                  <Grid item xs={12}>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <FormLabel sx={{ pr: '16px' }}>Structural Feasibility</FormLabel>
            <RadioGroup
                row
                name="Structural Feasibility"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
               
            </RadioGroup>
        </FormControl>
        </Grid>
                  
             

        <Grid item xs={12}>
        <Button variant="contained" component="label">
  Upload Photos
  <input hidden accept="image/*" multiple type="file" />
</Button>

          
        </Grid>
    
        
    </Container>
  );
}
