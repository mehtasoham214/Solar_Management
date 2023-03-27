import * as React from "react";
import PastProject from "../salesDashboard/pastProjects";
import PermanentDrawerLeft from "../salesDashboard/navBar";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Send from '@mui/icons-material/Send';
import { useState } from "react";
  
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from "@mui/material";
import Radio from "@mui/material";
import FormLabel from "@mui/material";




function SiteInspectorForm()
{
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const [formData, setFormData] = useState({
    Measurements: '',
    email: '',
    message: ''

  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };  
  
  const handleFormChange = (event) => {
    const { Measurements, value } = event.target;
    setFormData({ ...formData, [Measurements]: value });
  };
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );
  return (
    <form onSubmit={handleFormSubmit}>

    <div style={{ display: 'block' }}>
      <TextField
        id="Measurements"
        Measurements="Measurements"
        label="Measurements"
        variant="outlined"
        value={formData.name}
        onChange={handleFormChange}
      />
    </div>
  
    <div style={{ display: 'block' }}>
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={handleFormChange}
      />
    </div>
    <div style={{ display: 'block' }}>
      <TextField
        id="message"
        name="message"
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleFormChange}
      />
    </div>
    <div style={{ display: 'block' }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<Send />}
      >
        Send
      </Button>
    </div>
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  </form>
    

//   <form onSubmit={handleFormSubmit}>
//   <TextField
//     id="name"
//     name="name"
//     label="Name"
//     variant="outlined"
//     value={formData.name}
//     onChange={handleFormChange}
//   />
//   <TextField
//     id="email"
//     name="email"
//     label="Email"
//     variant="outlined"
//     value={formData.email}
//     onChange={handleFormChange}
//   />
//   <TextField
//     id="message"
//     name="message"
//     label="Message"
//     variant="outlined"
//     multiline
//     rows={4}
//     value={formData.message}
//     onChange={handleFormChange}
//   />
//   <Button
//     type="submit"
//     variant="contained"
//     color="primary"
//     endIcon={<Send />}
//   >
//     Send
//   </Button>
// </form>

  )
}

export default SiteInspectorForm;
