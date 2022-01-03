import React, {useEffect} from 'react';
import { Paper, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, 
    IconButton, Button, FormControl, InputLabel, Select, MenuItem  } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

const brut = [
    {_id:1, username:'MBY', contact:'Mouha', profile:{_id:'Admin', name:"Administrateur"}, isActif:true}, 
    {_id:2, username:'ZJA', contact:'Zied Jaziri', profile:{_id:'User', name:"Utilisateur"}, isActif:true},
    {_id:3, username:'BBO', contact:"Bouthaina BOUHOULI", profile:{_id:'Guest', name:"Visiteur"}, isActif:true},
    {_id:4, username:'BYA', contact:"Bayrem YAHYAOUI", profile:{_id:'Guest', name:"Visiteur"}, isActif:false}
]


export default function Users() {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [filterUsers, setFilterUsers] = React.useState(true);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        let __rows = brut.filter(row => row.isActif === filterUsers);
        setPage(0);
        setRows(__rows);

    }, [filterUsers])

    const handleFilterUsers = (event) => {
        setFilterUsers(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    //const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Grid item >
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Utilisateurs
                </Typography>
                <Grid style={{display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end", marginTop:5, marginBottom:20}}>
                    <FormControl variant='standard' style={{width:'auto', marginRight:10 }}>
                        <InputLabel id="select-filter">Etat</InputLabel>
                        <Select
                        labelId="select-filter"
                        id="simple-select"
                        value={filterUsers}
                        label="Actifs"
                        onChange={handleFilterUsers}
                        >
                            <MenuItem value={true}>Actifs</MenuItem>
                            <MenuItem value={false}>Supprimés</MenuItem>
                        </Select>
                    </FormControl>
                    <Link to="./add" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button variant="contained">Ajouter</Button>
                    </Link>
                </Grid>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom d'utilisateur</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Profil</TableCell>
                            <TableCell>Actif</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.contact}</TableCell>
                            <TableCell>{row.profile.name}</TableCell>
                            <TableCell>{row.isActif ? <CheckCircleRoundedIcon style={{fill: "green"}}/> : <CancelRoundedIcon style={{fill: "red"}}/>}</TableCell>
                            <TableCell align="right">
                                <Link to={`./view/${row._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <IconButton aria-label="show" >
                                        <VisibilityIcon />
                                    </ IconButton>
                                </Link>                    
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </ IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[1, 10, 50, { value: 10000, label: 'All' }]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>
    )
}
