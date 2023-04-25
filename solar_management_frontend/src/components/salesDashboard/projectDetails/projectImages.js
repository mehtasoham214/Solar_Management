import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

//Theme Imports
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

const itemData = [
    {
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
    },
    {
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Burger",
    },
    {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
    },
    {
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Coffee",
    },
    {
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Hats",
    },
    {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
    },
    {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "Basketball",
    },
    {
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        title: "Fern",
    },
    {
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        title: "Mushrooms",
    },
    {
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Tomato basil",
    },
    {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Sea star",
    },
    {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
    },
];

function ProjectImage() {
    // use the slice method to limit the number of images
    const limitedImages = itemData.slice(0, 3);

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ border: 3, borderRadius: 2, borderColor: "gray" }}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <h1>Project Images</h1>
                    </Grid>
                    <Grid item lg={8}>
                        <ImageList sx={{ width: 700 }} cols={3} rowHeight={250}>
                            {limitedImages.map((image) => (
                                <ImageListItem key={image.id}>
                                    <img
                                        src={`${image.img}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${image.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={image.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                    <Grid item lg={4}>
                        <Box
                            sx={{
                                border: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 244,
                                width: 250,
                                marginTop: 1.8,
                            }}
                        >
                            <Typography>See more</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default ProjectImage;
