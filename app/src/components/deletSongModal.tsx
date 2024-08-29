import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDeleteSongMutation } from '../api/slices/song.slices';

interface DeleteSongModalProps {
    open: boolean;
    songId: string;
    onClose: () => void;
}


const DeleteSongModal: React.FC<DeleteSongModalProps> = ({ open, onClose, songId }) => {


    const [DeleteSong, { isLoading }] = useDeleteSongMutation();

    const handleDelete = async () => {
        try {
            await DeleteSong(songId).unwrap();
            onClose();
        } catch (error: any) {
            console.error(error);
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Song</DialogTitle>
            <DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" onClick={handleDelete} variant="contained" color="primary" disabled={isLoading}>
                        {
                            isLoading ? 'Deleting...' : 'Delete'
                        }
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteSongModal;