import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';


const user = {_id:1, username:'MBY', contact:'Mouha BEN YAHIA', email:'mby@self.com', profile:{_id:'Admin', name:"Administrateur"}, isActif:true}


export default function UserView() {
    const navigate = useNavigate();
    const { id } = useParams();
      
    return (
        <Grid item >
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Utilisateur
            </Typography>
            <Grid style={{display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end", marginTop:5, marginBottom:20}}>
                <Button variant="outlined" onClick={() => navigate(-1)}>Retour</Button>
            </Grid>
            <form>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                Id : {id}
                </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            value={user.contact}
                            disabled
                            fullWidth
                            id="contact"
                            label="Contact"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        disabled
                        id="username"
                        label="Nom d'utilisateur"
                        value={user.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            disabled
                            value={user.email}
                            id="email"
                            label="Email"
                            type='email'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required variant='outlined'>
                            <InputLabel id="select-filter">Profil</InputLabel>
                            <Select
                            labelId="select-filter"
                            id="simple-select"
                            label="Profil"
                            disabled
                            value={user.profile._id}
                            >
                                <MenuItem value={user.profile._id}>{user.profile.name}</MenuItem>)
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        {" Actif : "}
                    </Grid>
                    <Grid item xs={12} sm={11}>
                        {user.isActif ? <CheckCircleRoundedIcon style={{fill: "green"}}/> : <CancelRoundedIcon style={{fill: "red"}}/>}
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Grid>
    );
}
