import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, List, ListItem, ListItemText, IconButton, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ISongs } from '../api/types/songs.types';
import CreateSongModal from '../components/CreateSongModal';
import { useGetSongsQuery } from '../api/slices/song.slices';

const HomePage = () => {
    const [page, setPage] = useState(0);
    const { data: songs, isLoading } = useGetSongsQuery(page);
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleDelete = async (id: string) => {
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Music App
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/statistics">
                        Statistics
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenCreateModal(true)}
                        sx={{ marginY: 2 }}
                    >
                        Add New Song
                    </Button>
                </Toolbar>
            </AppBar>

            <Container>
                <Typography variant="h4" component="h1" sx={{ marginTop: 4 }}>
                    Songs List
                </Typography>

                {
                    (isLoading && !songs) ? <CircularProgress />
                        :
                        <>
                            <List>
                                {songs?.map((song) => (
                                    <ListItem
                                        key={song._id}
                                        sx={{
                                            border: '1px solid #ddd',
                                            borderRadius: 1,
                                            marginBottom: 2,
                                        }}
                                    >
                                        <ListItemText
                                            primary={`${song.title} - ${song.artist}`}
                                            secondary={`Album: ${song.album}, Genre: ${song.genre}`}
                                        />
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            component={RouterLink}
                                            to={`/edit/${song._id}`}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDelete(song._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>

                            {/**add pagination here */}
                            <Button onClick={() => setPage((page) - 1)} disabled={page === 0}>Previous</Button>
                            <Button onClick={() => setPage(page + 1)}>Next</Button>
                        </>


                }


            </Container>

            <CreateSongModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
        </Box>
    );
};

export default HomePage;
