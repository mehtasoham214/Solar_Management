import * as React from "react";
import { useState } from "react";
import axios from "axios";
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
} from "@mui/material";

export default function SiteInspectorForm() {
    const [backyardInfo,setBackyardInfo ] = useState();
    const [roofInfo, setRoofInfo] = useState();
    const [grid, setGrid] = useState();
    const [irradiance, setIrradiance] = useState();
    const [meterCompatibility, setMeterCompatibility] = useState();
    const [coordinates, setCoordinates] = useState();
    const [environment, setEnvironmnet] = useState();
    const [building, setBuilding] =useState();
    const [electrical, setElectrical] = useState();
    const [zone, setZone] = useState();
    const [landUse, setLandUse] = useState();
    const [interconnection, setInterconnection] = useState();
    const [netMetering, setNetMetering] = useState();
    const [propertyEasement, setPropertyEasement] = useState();
    const [hoa, setHoa] = useState();
    const [feasibility, setFeasibility] = useState();
    const [structuralFeasibility, setStructuralFeasibility] = useState();
    //const [photos, setPhotos] = useState([]);
    console.log(backyardInfo);
    const handleSubmit = async() => {
        const formData ={
            backyardInfo: backyardInfo,
            roofInfo: roofInfo,
            grid: grid,
            irradiance: irradiance,
            meterCompatibility: meterCompatibility,
            coordinates: coordinates,
            environment: environment,
            building: building,
            electrical: electrical,
            zone: zone,
            landUse: landUse,
            interconnection: interconnection,
            netMetering: netMetering,
            propertyEasement: propertyEasement,
            hoa: hoa,
            feasibility: feasibility,
            structuralFeasibility: structuralFeasibility,
        }
        try {
            const token = localStorage.getItem("token");
            const id = localStorage.getItem("projectId");
            const response = await axios.patch(
                `${process.env.REACT_APP_API_URL}projects/areainfo/${id}`,
                { formData },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                alert("Area Info Added Successfully");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
            <Grid item md={8}>
                <Title>Site Inspector Info</Title>
            </Grid>

            <Grid item xs={12} md={8}>
                <TextField
                    helperText="Sqft"
                    id="outlined-basic"
                    label="BackYard Info"
                    variant="outlined"
                    onChange={(event)=> setBackyardInfo(event.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <TextField
                    helperText="Sqft"
                    id="outlined-basic"
                    label="Roof Info"
                    variant="outlined"
                    onChange={(event)=> setRoofInfo(event.target.value)}
                />
            </Grid>

            <Stack direction="row" spacing={2}>
                <Grid item xs={12}>
                    <FormControl
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <FormLabel sx={{ pr: "16px" }}>Grid Type</FormLabel>
                        <RadioGroup row name="Grid Type">
                            <FormControlLabel
                                value="On-Grid"
                                control={<Radio />}
                                label="On-Grid"
                                onChange={(event)=> setGrid(event.target.value)}
                            />
                            <FormControlLabel
                                value="Off-Grid"
                                control={<Radio />}
                                label="Off-Grid"
                                onChange={(event)=> setGrid(event.target.value)}
                            />
                            <FormControlLabel
                                value="Hybrid"
                                control={<Radio />}
                                label="Hybrid"
                                onChange={(event)=> setGrid(event.target.value)}
                            />
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
                        onChange={(event)=> setIrradiance(event.target.value)}
                    />
                </Grid>
                <Stack direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <FormControl
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <FormLabel
                                sx={{ pr: "16px", alignItems: "center" }}
                            >
                                Meter Compatibility{" "}
                            </FormLabel>
                            <RadioGroup row name="Meter Compatibility">
                                <FormControlLabel
                                    value="Yes"
                                    control={<Radio />}
                                    label="Yes"
                                    onChange={(event)=> setMeterCompatibility(event.target.value)}
                                />
                                <FormControlLabel
                                    value="No"
                                    control={<Radio />}
                                    label="No"
                                    onChange={(event)=> setMeterCompatibility(event.target.value)}
                                />
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
                    onChange={(event)=> setCoordinates(event.target.value)}
                />
            </div>

            <Grid item xs={6} md={8}>
                <FormControl component="fieldset" variant="standard">
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
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Environment
                                        </FormLabel>
                                        <RadioGroup row name="Environment">
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setEnvironmnet(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setEnvironmnet(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setEnvironmnet(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Building{" "}
                                        </FormLabel>
                                        <RadioGroup row name="Building">
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setBuilding(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setBuilding(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setBuilding(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Electrical{" "}
                                        </FormLabel>
                                        <RadioGroup row name="Electrical">
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setElectrical(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setElectrical(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setElectrical(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Zone{" "}
                                        </FormLabel>
                                        <RadioGroup row name="Zone">
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setZone(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setZone(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setZone(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            LandUse{" "}
                                        </FormLabel>
                                        <RadioGroup row name="LandUse">
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setLandUse(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setLandUse(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setLandUse(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Interconnection Agreement{" "}
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            name="Interconnection Agreement"
                                        >
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setInterconnection(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setInterconnection(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setInterconnection(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Net Metering Agreement{" "}
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            name="Net Metering Agreement"
                                        >
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setNetMetering(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setNetMetering(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setNetMetering(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Propery Easement Agreement{" "}
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            name="Property Easement Agreement"
                                        >
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setPropertyEasement(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setPropertyEasement(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setPropertyEasement(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            HOA Approval{" "}
                                        </FormLabel>
                                        <RadioGroup row name="HOA Approval">
                                            <FormControlLabel
                                                value="Yes"
                                                control={<Radio />}
                                                label="Yes"
                                                onChange={(event)=> setHoa(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="No"
                                                control={<Radio />}
                                                label="No"
                                                onChange={(event)=> setHoa(event.target.value)}
                                            />
                                            <FormControlLabel
                                                value="Not required"
                                                control={<Radio />}
                                                label="Not required"
                                                onChange={(event)=> setHoa(event.target.value)}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </FormControl>
                        </Grid>
                    </FormGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <FormLabel sx={{ pr: "16px" }}>Feasibility</FormLabel>
                    <RadioGroup row name="feasibility">
                        <FormControlLabel
                            value="Yes"
                            control={<Radio />}
                            label="Yes"
                            onChange={(event)=> setFeasibility(event.target.value)}
                        />
                        <FormControlLabel
                            value="No"
                            control={<Radio />}
                            label="No"
                            onChange={(event)=> setFeasibility(event.target.value)}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <FormLabel sx={{ pr: "16px" }}>
                        Structural Feasibility
                    </FormLabel>
                    <RadioGroup row name="Structural Feasibility">
                        <FormControlLabel
                            value="Yes"
                            control={<Radio />}
                            label="Yes"
                            onChange={(event)=> setStructuralFeasibility(event.target.value)}
                        />
                        <FormControlLabel
                            value="No"
                            control={<Radio />}
                            label="No"
                            onChange={(event)=> setStructuralFeasibility(event.target.value)}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" component="label">
                    Upload Photos
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
            </Grid>
            <Grid item xs={12}></Grid>
                        <Grid
                            item
                            md={3}
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
    );
}
