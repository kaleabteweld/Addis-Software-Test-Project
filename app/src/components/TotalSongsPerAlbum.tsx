import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useGetSongsPerAlbumQuery } from "../api/slices/song.slices";
import { PieChart } from '@mui/x-charts/PieChart';



export default function TotalSongsPerAlbum() {

    const { data: totalSongsPerAlbum, isFetching: totalSongsPerAlbumLoading } = useGetSongsPerAlbumQuery();
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Container>
                <Typography variant="h4" component="h1" sx={{ marginTop: 4 }}>
                    Total Number Of Songs Per Album
                </Typography>
                {
                    totalSongsPerAlbumLoading ? <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box> :
                        <PieChart
                            sx={{ marginTop: 4 }}
                            series={[
                                {
                                    data: (totalSongsPerAlbum as { _id: string, count: number }[]).map(({ _id, count }, id) => ({ id, label: _id, value: count })),
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