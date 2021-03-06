import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import InsightsIcon from '@mui/icons-material/Insights';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import TopicIcon from '@mui/icons-material/Topic';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './ModalLogin';

import { deleteUser, deleteAllSubtopicList, deleteAllQuestionList, deleteAllTopicList, deleteAnswers, deleteExam } from '../Redux/Slices';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) =>({
  background:({role}) => ({
    color: "#fff !important",
    background:
      role === "user"
        ? `${theme.palette.primary.main} !important`
        : role === "student" 
          ? `${theme.palette.secondary.main} !important`
          : `${theme.palette.tertiary.main} !important`
  }),
  navBox:{
    right: 5,
    display: "flex",
    justifyContent: "right",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  navItem:{ gap: 5, },
  mobile:{
    [theme.breakpoints.down("md")]: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
  drawer: ({ role }) => ({
    color: "#fff !important",
    zIndex: 1,
    marginTop: "60px",
    width: "240px",
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: "240px",
      height: "fit-content",
      background:
        role === "user"
          ? `${theme.palette.primary.main} !important`
          : role === "student" 
            ? `${theme.palette.secondary.main} !important`
            : `${theme.palette.tertiary.main} !important`
    },
  }),
  drawerItem: ({ role }) => ({
    color: "#fff !important",
    background:
      role === "user"
        ? `${theme.palette.primary.main} !important`
        : role === "student" 
          ? `${theme.palette.secondary.main} !important`
          : `${theme.palette.tertiary.main} !important`,
    "&:hover": {
      background:
        role === "user"
          ? `${theme.palette.primary.dark} !important`
          : role === "student" 
            ? `${theme.palette.secondary.dark} !important`
            : `${theme.palette.tertiary.dark} !important`,
    },
  }),
}))

export default function NavBar(){
  //const {role} = useSelector(state => state.slices.user);
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const classes = useStyles({role});

  // Drawer
  const [open, setOpen] = useState(false);
  const band = () => setOpen(!open);
  
  // Modal Login
  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);
  
  // Navigate
  const navigate = useNavigate();
  const handlePage = (route) => (event) => navigate(route);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("id");
    sessionStorage.removeItem("token");
    dispatch(deleteUser());
    dispatch(deleteAllTopicList())
    dispatch(deleteAllSubtopicList());
    dispatch(deleteAllQuestionList());
    dispatch(deleteAnswers());
    dispatch(deleteExam());
    navigate("/");
    window.location.reload(false);
  }

  return(
    <AppBar className={classes.background} position="static" >
    <Container>
      <Toolbar disableGutters>
        <Typography variant="h4" sx={{ display: { xs: 'none', md: 'flex' } }}>
          EXPRESS
        </Typography>
        <Box className={classes.navBox} sx={{ flexGrow: 1, }}>
          {role === "user" &&(
            <Box sx={{display: "flex"}}>
              <MenuItem className={classes.navItem} onClick={handlePage('/')}>
                <HomeIcon/>
                <Typography>Inicio</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage('/topics')}>
                <TopicIcon/>
                <Typography>Temas</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage('/register')}>
                <PersonIcon/>
                <Typography>Registro</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handleOpen}>
                <LoginIcon/>
                <Typography>Iniciar sesi??n</Typography>
              </MenuItem>
            </Box>
          )}
          {role === "student" &&(
            <Box sx={{display: "flex"}}>
              <MenuItem className={classes.navItem} onClick={handlePage('/student/')}>
                <HomeIcon/>
                <Typography>Inicio</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage('/student/topics')}>
                <TopicIcon/>
                <Typography>Temas</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage('/student/historial')}>
                <InsightsIcon/>
                <Typography>Rendimiento</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handleLogout}>
                <LogoutIcon/>
                <Typography>Salir</Typography>
              </MenuItem>
            </Box>
          )}
          {role === "teacher" &&(
            <Box sx={{display: "flex"}}>
              <MenuItem className={classes.navItem} onClick={handlePage('/teacher')}>
                <HomeIcon/>
                <Typography>Inicio</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage('/teacher/topics-up')}>
                <AddBoxIcon/>
                <Typography>Alta</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage('/teacher/topics-down')}>
                <DeleteIcon/>
                <Typography>Baja</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage('/teacher/topics-edit')}>
                <EditIcon/>
                <Typography>Modificar</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage('/teacher/students')}>
                <GroupIcon/>
                <Typography>Alumnos</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handleLogout}>
                <LogoutIcon/>
                <Typography>Salir</Typography>
              </MenuItem>
            </Box>
          )}
        </Box>

        <Box className={classes.mobile}>
          <Typography variant="h4" sx={{ display: { xs: 'flex', md: 'none' } }}>
            EXPRESS
          </Typography>
          <IconButton
            style={{ position: "absolute", right: "0px", top: "10px"}}
            sx={{ display: { md: "none" } }}
            color="inherit"
            edge="end"
            onClick={band}
          >
            {open ? <CloseIcon/> : <MenuIcon/>}
          </IconButton>
          <Drawer className={classes.drawer} open={open} onClose={band} anchor="right">
            <List>
              {role === "user" &&(
                <Box>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/')} sx={{gap: .5}}>
                    <HomeIcon/>
                    <Typography>Inicio</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/topics')} sx={{gap: .5}}>
                    <TopicIcon/>
                    <Typography>Temas</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/register')} sx={{gap: .5}}>
                    <PersonIcon/>
                    <Typography>Registro</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handleOpen} sx={{gap: .5}}>
                    <LoginIcon/>
                    <Typography>Iniciar sesi??n</Typography>
                  </ListItem>
                </Box>
              )}
              {role === "student" &&(
                <Box>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/student/')} sx={{gap: .5}}>
                    <HomeIcon/>
                    <Typography>Inicio</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/student/topics')} sx={{gap: .5}}>
                    <TopicIcon/>
                    <Typography>Temas</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/student/historial')} sx={{gap: .5}}>
                    <InsightsIcon/>
                    <Typography>Rendimiento</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handleLogout} sx={{gap: .5}}>
                    <LogoutIcon/>
                    <Typography>Salir</Typography>
                  </ListItem>
                </Box>
              )}
              {role === "teacher" &&(
                <Box>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/teacher')} sx={{gap: .5}}>
                    <HomeIcon/>
                    <Typography>Inicio</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/teacher/topics-up')} sx={{gap: .5}}>
                    <AddBoxIcon/>
                    <Typography>Alta</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/teacher/topics-down')} sx={{gap: .5}}>
                    <DeleteIcon/>
                    <Typography>Baja</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/teacher/topics-edit')} sx={{gap: .5}}>
                    <EditIcon/>
                    <Typography>Modificar</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handlePage('/teacher/students')} sx={{gap: .5}}>
                    <GroupIcon/>
                    <Typography>Alumnos</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={handleLogout} sx={{gap: .5}}>
                    <LogoutIcon/>
                    <Typography>Salir</Typography>
                  </ListItem>
                </Box>
              )}
            </List>
          </Drawer>
          <Login open={modal} handleClose={handleClose}/> 
        </Box>
      </Toolbar>
    </Container>
    </AppBar>
  );
}