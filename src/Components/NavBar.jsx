import React, {useState} from 'react';
import { makeStyles } from "@mui/styles";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

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
  }
}))

export default function NavBar(){
  localStorage.setItem("role", "user");
  const role = localStorage.getItem("role");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const handlePage = () => null;

  const aux = () => {
    setOpen(!open)
    console.log("Helloowwwww")
  }

  return(
    <AppBar position="static" >
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
          <MenuItem>
            <Brightness7Icon onClick={null}/>
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
            onClick={aux}
          >
            {open ? <CloseIcon/> : <MenuIcon/>}
          </IconButton>
          {open === true && (
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
        </Box>
      </Toolbar>
    </Container>
    </AppBar>
  );
}

/*
MOVIL

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={null}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={null} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={null}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

*/