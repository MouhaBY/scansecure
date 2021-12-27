import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const profiles = [
  {id:"superadmin", name:"Super Administrateur"},
  {id:"admin", name:"Administrateur"},
  {id:"user", name:"Utilisateur"},
  {id:"guest", name:"Visiteur"}
]

/*const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
*/

export default function UserCreate() {
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  const [matchPasswordError, setMatchPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = event => {
        event.preventDefault();
        if (password !== matchPassword){
          setMatchPasswordError(true)
        }
        else{
          var credentials = {
          'contact': contact,
          'username': username,
          'password': password,
          'email': email,
          'profile': profile
          }
          console.log(credentials)
        }
    }

    useEffect(() => {
      setMatchPasswordError(false)
    }, [password, matchPassword])

    

  return (
    <Grid item >
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Utilisateur
          </Typography>
          <Grid style={{display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end", marginTop:5, marginBottom:20}}>
            <Button variant="outlined" onClick={() => navigate(-1)}>Retour</Button>
          </Grid>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="contact"
                label="Contact"
                onChange={(e) => setContact(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Nom d'utilisateur"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                error={matchPasswordError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="matchPassword"
                label="Vérifier mot de passe"
                onChange={(e) => setMatchPassword(e.target.value)}
                type='password'
                error={matchPasswordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                type='email'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required variant='outlined'>
              <InputLabel id="select-filter">Profil</InputLabel>
                <Select
                labelId="select-filter"
                id="simple-select"
                label="Profil"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                >{
                  profiles.map(profile => <MenuItem key={profile.id} value={profile.id}>{profile.name}</MenuItem>)
                }                  
                </Select>
            </FormControl>
          </Grid>
          </Grid>
          <Grid style={{marginTop:15}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Créer
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}
