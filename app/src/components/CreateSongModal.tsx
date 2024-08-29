import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateSongMutation } from '../api/slices/song.slices';
import { INewSongFrom } from '../api/types/songs.types';

interface CreateSongModalProps {
    open: boolean;
    onClose: () => void;
}

const createSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    artist: z.string().min(1, 'Artist is required'),
    album: z.string().min(1, 'Album is required'),
    genre: z.string().min(1, 'Genre is required'),
});


const CreateSongModal: React.FC<CreateSongModalProps> = ({ open, onClose }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<INewSongFrom>({
        resolver: zodResolver(createSchema)
    });

    const [createSong, { isLoading }] = useCreateSongMutation();

    const onSubmit = async (data: INewSongFrom) => {
        try {
            await createSong(data).unwrap();
            reset();
            onClose();
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Song</DialogTitle>
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
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            {
                                isLoading ? 'Creating...' : 'Create'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSongModal;