import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, List, ListItem, ListItemText, IconButton, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ESongSearchField, ISongs, ISongSearchFrom } from '../api/types/songs.types';
import CreateSongModal from '../components/CreateSongModal';
import { useGetSongsQuery, useSearchSongsMutation } from '../api/slices/song.slices';
import EditSongModal from '../components/EditSongModal';
import DeleteSongModal from '../components/deletSongModal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

const HomePage = () => {
    const [page, setPage] = useState(1);
    // const { data: songs, isLoading } = useGetSongsQuery(page);

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState<ISongs | null>(null);

    const [searchField, setSearchField] = useState<ESongSearchField>(ESongSearchField.title);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const searchSchema = z.object({
        title: z.string().optional(),
        artist: z.string().optional(),
        album: z.string().optional(),
        genre: z.string().optional(),
        sort: z.array(z.object({
            field: z.string(),
            order: z.string().refine((val) => val === 'asc' || val === 'desc', { message: 'Invalid sort order' }),
        })).optional(),
    });

    const [Search, { isLoading, data: songs }] = useSearchSongsMutation();
    useEffect(() => {
        Search({ form: {}, page: page });
    }, []);

    const { register, handleSubmit, setValue } = useForm<ISongSearchFrom>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            title: undefined,
            album: undefined,
            artist: undefined,
            genre: undefined,
        }
    });

    const onSubmit = async (data: ISongSearchFrom) => {
        console.log(data);
        const _data = await Search({ form: data, page: 1 });
        console.log({ _data });
    };

    const handleSortOrderChange = (field: string) => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
        setValue('sort', [{ field, order: sortOrder }]);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Music App
                    </Typography>
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

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Search By</InputLabel>
                    <Select
                        value={searchField}
                        onChange={(e) => setSearchField(
                            e.target.value as ESongSearchField
                        )}
                    >
                        <MenuItem value="title">Title</MenuItem>
                        <MenuItem value="artist">Artist</MenuItem>
                        <MenuItem value="album">Album</MenuItem>
                        <MenuItem value="genre">Genre</MenuItem>
                    </Select>
                </FormControl>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <TextField
                        label={searchField.charAt(0).toUpperCase() + searchField.slice(1)}
                        {...register(searchField)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <IconButton onClick={() => handleSortOrderChange(searchField)} style={{
                        borderRadius: '50%',
                        border: '2px solid #1976d2',
                        marginLeft: '30px',
                        marginRight: '10px'
                    }}>
                        {sortOrder === 'asc' ? <ArrowUpward color='primary' /> : <ArrowDownward color='primary' />}
                    </IconButton>
                </div>
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </Box>

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
                                            onClick={() => {
                                                setSelectedSong(song);
                                                setOpenEditModal(true);
                                            }}
                                            to={`#`}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => {
                                                setOpenDeleteModal(true);
                                                setSelectedSong(song);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>

                            <Button onClick={() => setPage((page) - 1)} disabled={page === 0}>Previous</Button>
                            <Button onClick={() => setPage(page + 1)}>Next</Button>
                        </>


                }


            </Container>
            {selectedSong && <DeleteSongModal open={openDeleteModal} onClose={() => { setOpenDeleteModal(false) }} songId={selectedSong._id} />}
            {selectedSong && <EditSongModal open={openEditModal} onClose={() => setOpenEditModal(false)} song={selectedSong} songId={selectedSong._id} />}
            <CreateSongModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
        </Box>
    );
};

export default HomePage;
