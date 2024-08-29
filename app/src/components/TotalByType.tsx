import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useGetTotalByTypeQuery } from "../api/slices/song.slices";
import { useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';



export default function TotalByType() {

    const [totalBy, setTotalBy] = useState<"songs" | "artists" | "albums" | "genres" | "all">("all");
    const { data: _totalBy, isFetching: _totalByLoading, refetch } = useGetTotalByTypeQuery(totalBy);
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Container>
                <Typography variant="h4" component="h1" sx={{ marginTop: 4 }}>
                    Number of
                </Typography>
                <Button variant={totalBy === "all" ? "contained" : "outlined"} sx={{ marginRight: 2 }} onClick={() => { setTotalBy("all"); refetch() }}>Total all</Button>
                <Button variant={totalBy === "songs" ? "contained" : "outlined"} sx={{ marginRight: 2 }} onClick={() => { setTotalBy("songs"); refetch() }}>Total Songs</Button>
                <Button variant={totalBy === "artists" ? "contained" : "outlined"} sx={{ marginRight: 2 }} onClick={() => { setTotalBy("artists"); refetch() }}>Total Artists</Button>
                <Button variant={totalBy === "albums" ? "contained" : "outlined"} sx={{ marginRight: 2 }} onClick={() => { setTotalBy("albums"); refetch() }}>Total Albums</Button>
                <Button variant={totalBy === "genres" ? "contained" : "outlined"} sx={{ marginRight: 2 }} onClick={() => { setTotalBy("genres"); refetch() }}>Total Genres</Button>

                {
                    _totalByLoading ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box> :
                        totalBy === "all" ? <PieChart
                            sx={{ marginTop: 4 }}
                            series={[
                                {
                                    data: Object.entries(_totalBy as { songs: number, artists: number, albums: number, genres: number }).map(([label, value], id) => ({ id, label, value })),
                                },
                            ]}
                            width={400}
                            height={200}
                        /> : <Box>
                            <Typography variant="h6" component="h2">Total {totalBy}: {_totalBy as number}</Typography>
                        </Box>

                }

            </Container>
        </Box>
    );
}