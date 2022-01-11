import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertDialog({ open, handleClose, user, handleDelete }) {

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Êtes vous sûr de vouloir supprimer l'utilisateur ?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Vous êtes sur le point de supprimer l'utilisateur {user?.username}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>Annuler</Button>
                <Button onClick={handleDelete}>
                    Confirmer
                </Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}
