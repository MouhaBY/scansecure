import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function NotFoundPage() {
    let navigate = useNavigate();

    const handleReturn = () => {
        navigate(`/`)
    }

    return (
        <Grid align='center' marginTop={10}>
            <Typography variant="h3" component="h2" marginBottom={2}>
            Cette page n'existe pas !
            </Typography>
            <Typography variant="h5" component="h3"  marginBottom={2}>
            La page que vous recherchez semble introuvable.
            </Typography>
            <Grid align='center'>
            <Button color='primary' variant='contained' onClick={handleReturn}>Retour à l'accueil</Button>
            </Grid>
        </Grid>
    )
}
