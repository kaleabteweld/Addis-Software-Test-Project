import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ISongs } from '../api/types/songs.types';

const HomePage = () => {
    const [songs, setSongs] = useState<ISongs[]>([]);

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
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container>
                <Typography variant="h4" component="h1" sx={{ marginTop: 4 }}>
                    Songs List
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/create"
                    sx={{ marginY: 2 }}
                >
                    Add New Song
                </Button>

                {/* List of Songs */}
                <List>
                    {songs.map((song) => (
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
            </Container>
        </Box>
    );
};

export default HomePage;
