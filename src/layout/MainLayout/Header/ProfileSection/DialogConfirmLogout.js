import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

const DialogConfirmLogout = ({ logout, open, navigate, handleClose }) => {

    const handleLogout = () => {
        logout();
        navigate();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ alignItem: "center", textAlign: "center" }}>
                        <Typography variant='h2' sx={{m:2}}>Confirmation de déconnexion</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body" sx={{m:5}}>Êtes-vous sûr de vouloir vous déconnecter ?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleLogout} color="error" autoFocus>
                        Déconnexion
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogConfirmLogout;
