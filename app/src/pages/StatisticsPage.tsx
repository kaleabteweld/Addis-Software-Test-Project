import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import TotalByType from "../components/TotalByType";
import TotalSongsPerGenre from "../components/TotalSongsPerGenre";
import TotalSongsPerArtist from "../components/TotalSongsPerArtistStats";
import TotalSongsPerAlbum from "../components/TotalSongsPerAlbum";



export default function StatisticsPage() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Music App Statistics
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                </Toolbar>
            </AppBar>

            <Container>
                <TotalByType />
                <TotalSongsPerGenre />
                <TotalSongsPerArtist />
                <TotalSongsPerAlbum />

            </Container>
        </Box>
    );
}