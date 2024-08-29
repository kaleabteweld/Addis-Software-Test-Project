import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useGetArtistStatsQuery } from "../api/slices/song.slices";
import { PieChart } from '@mui/x-charts/PieChart';
import { useState } from "react";



export default function TotalSongsPerArtist() {

    const [totalBy, setTotalBy] = useState<"songs" | "albums">("songs");
    const { data: totalSongsPerArtist, isFetching: totalSongsPerArtistLoading, refetch } = useGetArtistStatsQuery();
    console.log(totalSongsPerArtist);
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Container>
                <Typography variant="h4" component="h1" sx={{ marginTop: 4 }}>
                    Total Number Of Songs Per Artist
                </Typography>

                <Button variant={totalBy === "albums" ? "contained" : "outlined"} sx={{ marginRight: 2 }} onClick={() => { setTotalBy("albums"); refetch() }}>Total Albums</Button>
                <Button variant={totalBy === "songs" ? "contained" : "outlined"} sx={{ marginRight: 2 }} onClick={() => { setTotalBy("songs"); refetch() }}>Total Songs</Button>


                {
                    totalSongsPerArtistLoading ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box> :
                        <PieChart
                            sx={{ marginTop: 4 }}
                            series={[
                                {
                                    data: (totalSongsPerArtist as { _id: string, totalAlbums: number, totalSongs: number }[]).map(({ _id, totalAlbums, totalSongs }, id) =>
                                        ({ id, label: _id, value: totalBy === "albums" ? totalAlbums : totalSongs })),
                                },
                            ]}
                            width={800}
                            height={300}
                        />
                }

            </Container>
        </Box>
    );
}