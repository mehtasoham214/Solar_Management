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
} from "@mui/material";


export default function SiteInspectorForm() {
  return (
    
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField helperText="Sqft" id="outlined-basic" label="Measurements" variant="outlined" />
      <div>
      <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Meter Compatibility</FormLabel>
  <RadioGroup
  row
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="Yes"
    name="radio-buttons-group"
  >
    <FormControlLabel value="female" control={<Radio />} label="Yes" />
    <FormControlLabel value="male" control={<Radio />} label="No" />
    
  </RadioGroup>
</FormControl>
</div>
<div>
<TextField helperText="Watts/sqft"id="outlined-basic" label="Irradiance" variant="outlined" />

  </div>
  
  <div>
  <FormControl>
    <FormLabel
      sx={{ display: "inline-flex" }}
      id="demo-radio-buttons-group-label"
      value="start"
    >
      Feasibility
    </FormLabel>
    <RadioGroup
      sx={{ display: "flex", flexDirection: "row" }}
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="Yes"
      name="radio-buttons-group"
    >
      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="No" control={<Radio />} label="No" />
    </RadioGroup>
  </FormControl>
</div>



  <div>
  <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Structural Feasibility</FormLabel>
  <RadioGroup
  row
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="Yes"
    name="radio-buttons-group"
  >
    <FormControlLabel value="female" control={<Radio />} label="Yes" />
    <FormControlLabel value="male" control={<Radio />} label="No" />
    
  </RadioGroup>
</FormControl>
  </div>
 
<div>

<Button  variant="contained">Upload Photos</Button>

  </div>
      
      
      
      
    </Box>
  );
}



// function SiteInspectorForm()
// {
//   const [checked, setChecked] = React.useState([true, false]);

//   const handleChange1 = (event) => {
//     setChecked([event.target.checked, event.target.checked]);
//   };

//   const handleChange2 = (event) => {
//     setChecked([event.target.checked, checked[1]]);
//   };

//   const handleChange3 = (event) => {
//     setChecked([checked[0], event.target.checked]);
//   };

//   const [formData, setFormData] = useState({
//     Measurements: '',
//     email: '',
//     message: ''

//   });

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//   };  
  
//   const handleFormChange = (event) => {
//     const { Measurements, value } = event.target;
//     setFormData({ ...formData, [Measurements]: value });
//   };
//   const children = (
//     <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
//       <FormControlLabel
//         label="Child 1"
//         control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
//       />
//       <FormControlLabel
//         label="Child 2"
//         control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
//       />
//     </Box>
//   );
//   return (
//     <form onSubmit={handleFormSubmit}>

//     <div style={{ display: 'block' }}>
//       <TextField
//         id="Measurements"
//         Measurements="Measurements"
//         label="Measurements"
//         variant="outlined"
//         value={formData.name}
//         onChange={handleFormChange}
//       />
//     </div>
  
//     <div style={{ display: 'block' }}>
//       <TextField
//         id="email"
//         name="email"
//         label="Email"
//         variant="outlined"
//         value={formData.email}
//         onChange={handleFormChange}
//       />
//     </div>
//     <div style={{ display: 'block' }}>
//       <TextField
//         id="message"
//         name="message"
//         label="Message"
//         variant="outlined"
//         multiline
//         rows={4}
//         value={formData.message}
//         onChange={handleFormChange}
//       />
//     </div>
//     <div style={{ display: 'block' }}>
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         endIcon={<Send />}
//       >
//         Send
//       </Button>
//     </div>
//     <div>
//       <FormControlLabel
//         label="Parent"
//         control={
//           <Checkbox
//             checked={checked[0] && checked[1]}
//             indeterminate={checked[0] !== checked[1]}
//             onChange={handleChange1}
//           />
//         }
//       />
//       {children}
//     </div>
//   </form>
    

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

 


