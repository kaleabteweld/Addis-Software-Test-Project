import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useGetTotalSongsPerGenreQuery } from "../api/slices/song.slices";
import { PieChart } from '@mui/x-charts/PieChart';



export default function TotalSongsPerGenre() {

    const { data: totalSongsPerGenre, isFetching: totalSongsPerGenreLoading, } = useGetTotalSongsPerGenreQuery();
    console.log(totalSongsPerGenre);
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Container>
                <Typography variant="h4" component="h1" sx={{ marginTop: 4 }}>
                    Total Number Of Songs Per Genre
                </Typography>
                {
                    totalSongsPerGenreLoading ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box> :
                        <PieChart
                            sx={{ marginTop: 4 }}
                            series={[
                                {
                                    data: (totalSongsPerGenre as { _id: string, count: number }[]).map(({ _id, count }, id) => ({ id, label: _id, value: count })),
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                }

            </Container>
        </Box>
    );
}