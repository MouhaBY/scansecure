import React,  { useState } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Alert, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const paperStyle={padding :20,height:'70vh',width:320, margin:"20px auto", display:"flex", flexDirection:"column", justifyContent:"center"}
const avatarStyle={backgroundColor:'#1bbd7e', margin:5}
const btnstyle={margin:'8px 0'}

function Login({setToken}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault()
        if(username === "123" && password === "123"){
            setErrorMessage("");
            setToken("login OK")            
        }
        else{
            setErrorMessage('Adresse e-mail ou mot de passe invalide');    
        }
    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={handleSubmit}>
                <Grid style={{margin:20}} align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <Typography component="h1" variant="h5" color="#1bbd7e">
                        Securiscan
                    </Typography>
                </Grid>                
                <TextField margin="dense"  label="Nom d'utilisateur" placeholder="Votre nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} fullWidth required/>
                <TextField margin="dense" label="Mot de passe" placeholder="Entrer votre mot de passe" type="password" value={password} onChange={e=> setPassword(e.target.value)} fullWidth required/>
                <Button style={btnstyle} type='submit' color='primary' variant='contained' fullWidth> Se connecter</Button>
                </form>
                {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                )}
            </Paper>
        </Grid>
    )
}

export default Login;
