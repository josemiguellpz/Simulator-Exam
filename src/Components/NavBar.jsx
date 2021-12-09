import React, {useState} from 'react';
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

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
import QuizIcon from '@mui/icons-material/Quiz';

const useStyles = makeStyles((theme) =>({
  background:({role}) => ({
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
  localStorage.setItem("role", "user");
  const role = localStorage.getItem("role");
  const classes = useStyles({role});
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(false);
  const band = () => setOpen(!open);
  const handlePage = () => null;
  const changeMode = () => {
    setMode(!mode)
  };

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
              <MenuItem className={classes.navItem} onClick={null}>
                <HomeIcon/>
                <Typography>Inicio</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <TopicIcon/>
                <Typography>Temas</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <PersonIcon/>
                <Typography>Registro</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <LoginIcon/>
                <Typography>Iniciar sesión</Typography>
              </MenuItem>
            </Box>
          )}
          {role === "student" &&(
            <Box sx={{display: "flex"}}>
              <MenuItem className={classes.navItem} onClick={null}>
                <HomeIcon/>
                <Typography>Inicio</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <TopicIcon/>
                <Typography>Temas</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <QuizIcon/>
                <Typography>Examen</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <InsightsIcon/>
                <Typography>Rendimiento</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <LogoutIcon/>
                <Typography>Salir</Typography>
              </MenuItem>
            </Box>
          )}
          {role === "teacher" &&(
            <Box sx={{display: "flex"}}>
              <MenuItem className={classes.navItem} onClick={null}>
                <HomeIcon/>
                <Typography>Inicio</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <AddBoxIcon/>
                <Typography>Alta</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <DeleteIcon/>
                <Typography>Baja</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <EditIcon/>
                <Typography>Modificar</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <GroupIcon/>
                <Typography>Alumnos</Typography>
              </MenuItem>
              <MenuItem className={classes.navItem} onClick={handlePage}>
                <LogoutIcon/>
                <Typography>Salir</Typography>
              </MenuItem>
            </Box>
          )}
          <MenuItem onClick={changeMode}>
            {mode ? 
              <Box sx={{display: "flex", gap: .5}}>
                <Brightness4Icon/> 
              </Box>
            : <Box sx={{display: "flex", gap: .5}}>
                <Brightness7Icon/> 
              </Box>
            }
          </MenuItem>
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
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <HomeIcon/>
                    <Typography>Inicio</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <TopicIcon/>
                    <Typography>Temas</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <PersonIcon/>
                    <Typography>Registro</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <LoginIcon/>
                    <Typography>Iniciar sesión</Typography>
                  </ListItem>
                </Box>
              )}
              {role === "student" &&(
                <Box>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <HomeIcon/>
                    <Typography>Inicio</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <TopicIcon/>
                    <Typography>Temas</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <QuizIcon/>
                    <Typography>Examen</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <InsightsIcon/>
                    <Typography>Rendimiento</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <LogoutIcon/>
                    <Typography>Salir</Typography>
                  </ListItem>
                </Box>
              )}
              {role === "teacher" &&(
                <Box>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <HomeIcon/>
                    <Typography>Inicio</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <AddBoxIcon/>
                    <Typography>Alta</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <DeleteIcon/>
                    <Typography>Baja</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <EditIcon/>
                    <Typography>Modificar</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <GroupIcon/>
                    <Typography>Alumnos</Typography>
                  </ListItem>
                  <ListItem button className={classes.drawerItem} onClick={null} sx={{gap: .5}}>
                    <LogoutIcon/>
                    <Typography>Salir</Typography>
                  </ListItem>
                </Box>
              )}
              <ListItem button className={classes.drawerItem} onClick={changeMode}>
                {mode ? 
                  <Box sx={{display: "flex", gap: .5}}>
                    <Brightness4Icon/> 
                    <Typography>Aspecto: Oscuro</Typography>
                  </Box>
                : <Box sx={{display: "flex", gap: .5}}>
                    <Brightness7Icon/> 
                    <Typography>Aspecto: Claro</Typography>
                  </Box>
                }
              </ListItem>
            </List>
          </Drawer>
        </Box>
      </Toolbar>
    </Container>
    </AppBar>
  );
}