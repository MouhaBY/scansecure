import { Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, 
    TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {employees, presence} from './EmployeesData'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import compareAsc from 'date-fns/compareAsc';
import nextSunday from 'date-fns/nextSunday';
import previousMonday from 'date-fns/previousMonday';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday'
import { intervalToDuration, getDay } from 'date-fns';



export default function TimeActivities() {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [dateRowsPerPage, setDateRowsPerPage] = React.useState(7);
    const [datePage, setDatePage] = React.useState(0);
    
    const [rows, setRows] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState();
    const [dateFrom, setDateFrom] = React.useState();
    const [dateTo, setDateTo] = React.useState();
    const [dateInterval, setDateInterval] = React.useState([]);
    const [userPresence, setUserPresence] = React.useState([]);


    useEffect(() => {
        let __rows = employees
        setPage(0);
        setRows(__rows);
        setDateFrom(previousMonday(Date.now()));
        setDateTo(nextSunday(Date.now()));
    }, [])

    useEffect(()=>{
        let result = [];
        if(dateTo && dateFrom){
            if (dateTo === dateFrom){
                result = [dateTo];
            }
            else if (compareAsc(dateFrom, dateTo)>0){
                setDateTo(dateFrom);
                result = [dateFrom];
            }
            else {
                result = eachDayOfInterval({
                    start: dateFrom,
                    end: dateTo
                })
            }
        }
        setDateInterval(result)
    }, [dateFrom, dateTo])

    useEffect(() => {
        let employee_presence = presence.filter((present)=>(selectedRow?._id === present.employee_id))
        setUserPresence(employee_presence)
    }, [selectedRow]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDateChangePage = (event, newPage) => {
        setDatePage(newPage);
    };
    
    const handleDateChangeRowsPerPage = (event) => {
        setDateRowsPerPage(parseInt(event.target.value, 10));
        setDatePage(0);
    };

    const handleSelectRow = (row) => {
        if (selectedRow?._id){
            if (selectedRow._id === row._id){
                setSelectedRow()
            }
            else {
                setSelectedRow(row)
            }
        }
        else {
            setSelectedRow(row)
        }
    }

    return (
        <Grid item>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Temps & Activités
            </Typography> 
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h3" variant="h7" color="primary" gutterBottom>
                    Employé
                </Typography>
                <Grid container align="center" margin={1} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            value={selectedRow?.name || ""}
                            disabled
                            id="name"
                            label="Nom"
                            style={{margin:2}}
                        />
                        <TextField
                            variant="outlined"
                            value={selectedRow?.subname || ""}
                            disabled
                            id="subname"
                            label="Prénom"
                            style={{margin:2}}
                        />
                        <TextField
                            variant="outlined"
                            value={selectedRow?.matricule || ""}
                            disabled
                            id="matricule"
                            label="Matricule"
                            style={{margin:2}}
                        />
                        <TextField
                            variant="outlined"
                            value={selectedRow?.service || ""}
                            disabled
                            id="service"
                            label="Service"
                            style={{margin:2}}
                        />
                        <TextField
                            variant="outlined"
                            value={selectedRow?.timesheet || ""}
                            disabled
                            id="timesheet"
                            label="Feuille de temps"
                            style={{margin:2}}
                        />
                    </Grid>
                </Grid>
                <Grid style={{display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end", marginTop:5, marginBottom:5}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom</TableCell>
                                <TableCell>Prénom</TableCell>
                                <TableCell>Matricule</TableCell>
                                <TableCell>Service</TableCell>
                                <TableCell>Feuille de temps</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <TableRow hover selected={row._id === selectedRow?._id ? true : false} onClick={() => handleSelectRow(row)} key={row._id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.subname}</TableCell>
                                <TableCell>{row.matricule}</TableCell>
                                <TableCell>{row.service}</TableCell>
                                <TableCell>{row.timesheet}</TableCell>
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
                </Grid>
            </Paper>
        <Paper sx={{ p: 2, mt:2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h3" variant="h7" color="primary" gutterBottom>
                    Rapport
                </Typography> 
                <Grid style={{marginTop:15, marginBottom:20}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={2} direction ="row">
                            <DesktopDatePicker
                                label="Date du"
                                inputFormat="dd/MM/yyyy"
                                value={dateFrom}
                                onChange={setDateFrom}
                                renderInput={(params) => <TextField {...params} />}
                                style={{margin:2}}
                            />
                            <DesktopDatePicker
                                label="Date au"
                                inputFormat="dd/MM/yyyy"
                                value={dateTo}
                                onChange={setDateTo}
                                renderInput={(params) => <TextField {...params} />}
                                style={{margin:2}}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <Grid style={{marginTop:5, marginBottom:5}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell >Jour</TableCell>
                                <TableCell >Date</TableCell>
                                <TableCell align="center">Entrée</TableCell>
                                <TableCell align="center">Sortie</TableCell>
                                <TableCell align="center">Etat</TableCell>
                                <TableCell align="center">Théorique</TableCell>
                                <TableCell align="center">Effectué</TableCell>
                                <TableCell align="center">Différence</TableCell>
                                <TableCell >Commentaire</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {dateInterval
                        .slice(datePage * dateRowsPerPage, datePage * dateRowsPerPage + dateRowsPerPage)
                        .map((row, index) => 
                        {   
                            let d = format(row, 'dd/MM/yyyy');
                            let presence_day = userPresence.find(element => d === element.date);
                            let work_day = selectedRow?.timesheetDetails.find(element => element.dayId === getDay(row));
                            /*let startTime = 
                            let endTime = 
                            let difference = 
                            */

                        return(
                            <TableRow key={index} selected={isToday(row)}>
                                <TableCell>{format(row, 'EEEE')}</TableCell>
                                <TableCell>{format(row, 'dd/MM/yyyy')}</TableCell>
                                <TableCell align="center">{presence_day && intervalToDuration({ start: 0, end: presence_day?.firstIn })?.hours + ":00"}</TableCell>
                                <TableCell align="center">{presence_day && intervalToDuration({ start: 0, end: presence_day?.lastOut })?.hours + ":00"}</TableCell>
                                <TableCell align="center">{work_day && presence_day && 
                                    intervalToDuration({start:presence_day?.firstIn, end:presence_day?.lastOut}).hours - work_day?.theorical - work_day?.break >=0 ? "+" : "-"
                                }</TableCell>
                                <TableCell align="center">{work_day && work_day?.theorical + ":00"}</TableCell>
                                <TableCell align="center">{presence_day && work_day && ((intervalToDuration({start:presence_day?.firstIn, end:presence_day?.lastOut}).hours || 0) - work_day?.break) + ":00"}</TableCell>
                                <TableCell align="center">{(work_day && work_day?.theorical && presence_day && 
                                    (intervalToDuration({start:presence_day?.firstIn, end:presence_day?.lastOut}).hours  - work_day?.theorical - work_day?.break) + ":00") || (- work_day?.theorical || 0 - work_day?.break || 0) +":00"
                                }</TableCell>
                                <TableCell>{presence_day?.comment || ""}</TableCell>
                            </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[1, 7, 31, { value: 10000, label: 'All' }]}
                        component="div"
                        count={dateInterval.length}
                        rowsPerPage={dateRowsPerPage}
                        page={datePage}
                        onPageChange={handleDateChangePage}
                        onRowsPerPageChange={handleDateChangeRowsPerPage}
                    />
                    </Grid>
                </Grid>
        </Paper>

        </Grid>
    )
}