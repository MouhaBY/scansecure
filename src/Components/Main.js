import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import URLHandler from './Urlhandler';
import { BrowserRouter as Router , Link as RouterLink} from 'react-router-dom';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import TimelapseOutlinedIcon from '@mui/icons-material/TimelapseOutlined';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MainApp({setToken}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDisconnect = () =>{ setToken("") }

  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
            <Router>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar style={{marginRight:2, backgroundColor:'transparent'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography variant="h6" noWrap component="div">
            Securiscan
          </Typography>
          <Button style={{marginRight:5, marginLeft:'auto'}} onClick={handleDisconnect} color="inherit">Se déconnecter</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem button >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Journal" />
            </ListItem>
          <RouterLink to="timeactivities" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button >
              <ListItemIcon>
                <AccessTimeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Temps & Activités" />
            </ListItem>
            </RouterLink>
        </List>
        <Divider />
        <List>
          <RouterLink to="employees" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button >
              <ListItemIcon>
                <BadgeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Employés" />
            </ListItem>
            </RouterLink>
            <ListItem button >
              <ListItemIcon>
                <TimelapseOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Feuilles de temps" />
            </ListItem>
          <RouterLink to="conges" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button >
              <ListItemIcon>
                <HolidayVillageOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Congés" />
            </ListItem>
            </RouterLink>
        </List>
        <Divider />
        <List>
          <RouterLink to="users" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Utilisateurs" />
            </ListItem>
            </RouterLink>
            <ListItem button >
              <ListItemIcon>
                <ToggleOffOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Configuration" />
            </ListItem>
            <ListItem button >
              <ListItemIcon>
                <SensorDoorOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Portes" />
            </ListItem>
        </List>
        <Divider />
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.grey[100],
            //overflow: 'auto',
            flex:1,
            flexDirection: "column",
            height: "100vh",
            p:2
          }}
        >
          <URLHandler />
        </Box>
      </Main>
      </Router>
    </Box>
  );
}
