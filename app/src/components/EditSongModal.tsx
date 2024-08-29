import React, { useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateSongMutation } from '../api/slices/song.slices';
import { ISongUpdateFrom, ISongs } from '../api/types/songs.types';

interface EditSongModalProps {
    open: boolean;
    songId: string;
    song: ISongs;
    onClose: () => void;
}

const EditSchema = z.object({
    title: z.string(),
    artist: z.string(),
    album: z.string(),
    genre: z.string()
});


const EditSongModal: React.FC<EditSongModalProps> = ({ open, onClose, song, songId }) => {

    const [songs, setSongs] = React.useState<ISongs>(song);
    const { register, handleSubmit, formState: { errors }, reset, setValue, setError } = useForm<ISongUpdateFrom>({
        resolver: zodResolver(EditSchema),
        defaultValues: songs
    });

    const [serverError, setServerError] = React.useState<string | null>(null);

    useEffect(() => {
        setSongs(song);
        setValue('title', song.title);
        setValue('artist', song.artist);
        setValue('album', song.album);
        setValue('genre', song.genre);
    }, [song]);

    const [EditSong, { isLoading }] = useUpdateSongMutation();

    const onSubmit = async (data: ISongUpdateFrom) => {
        try {
            await EditSong({ id: songId, song: data }).unwrap();
            reset();
            onClose();
        } catch (error: any) {
            if (!error.data.error) return;
            const err = error.data.error;
            if (err.type === "Validation") {
                setError(err.attr, { message: err.error });
            } else {
                setServerError(err.msg); // Set the server error message
            }
        }

    };

    return (
        <Dialog open={open} onClose={() => {
            reset();
            onClose()
        }}>
            <DialogTitle>Edit Song</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message as any}
                    />
                    <TextField
                        margin="dense"
                        label="Artist"
                        type="text"
                        fullWidth
                        {...register('artist')}
                        error={!!errors.artist}
                        helperText={errors.artist?.message as any}
                    />
                    <TextField
                        margin="dense"
                        label="Album"
                        type="text"
                        fullWidth
                        {...register('album')}
                        error={!!errors.album}
                        helperText={errors.album?.message as any}
                    />
                    <TextField
                        margin="dense"
                        label="Genre"
                        type="text"
                        fullWidth
                        {...register('genre')}
                        error={!!errors.genre}
                        helperText={errors.genre?.message as any}
                    />
                    {
                        serverError && <p style={{ color: 'red' }}>{serverError}</p>
                    }
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {
                                isLoading ? 'Editing...' : 'Edit'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditSongModal;