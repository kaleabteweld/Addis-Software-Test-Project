import { AppBar, Box, Button, CircularProgress, Container, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useGetTotalByTypeQuery } from "../api/slices/song.slices";
import { useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import TotalByType from "../components/TotalByType";



export default function StatisticsPage() {

    const [totalBy, setTotalBy] = useState<"songs" | "artists" | "albums" | "genres" | "all">("all");
    const { data: _totalBy, isFetching: _totalByLoading, refetch } = useGetTotalByTypeQuery(totalBy);
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

            </Container>
        </Box>
    );
}