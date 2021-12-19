import React, {useState} from "react";
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// import Card from '../../Components/Card';
import Login from '../../Components/ModalLogin';
import Button from '../../Components/ButtonSimple';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Fondo1 from '../../Assets/phrase.jpg';
import Fondo2 from '../../Assets/team.jpg';
import Fondo3 from '../../Assets/phone.jpg';

const useStyles = makeStyles((theme) => ({
  root:{
    /* border: "solid 1px", */
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
    },
  },
  info:{
    width: "500px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    marginLeft: 50,
    [theme.breakpoints.down("md")]:{
      marginTop: 100,
      zIndex: 1,
    },
  },
  title:{
    color: `${theme.palette.primary.main} !important`,
  },
  footer:{
    width: 700,
    height: 500,
    marginRight: 50,
  },
  img1:{
    width: 300,
    height: 350,
    borderRadius: "6px",
    position: "absolute",
    objectFit: "cover",
    top: 100,
    boxShadow: "0px 15px 25px rgba(0,0,0,0.50)",
    [theme.breakpoints.down("md")]:{
      display: "none"
    },
  },
  img2:{
    width: 300,
    height: 350,
    borderRadius: "6px",
    position: "absolute",
    objectFit: "cover",
    top: 150,
    right: 250,
    boxShadow: "0px 15px 25px rgba(0,0,0,0.50)",
    [theme.breakpoints.down("md")]:{
      display: "none"
    },
  },
  img3:{
    width: 300,
    height: 350,
    borderRadius: "6px",
    position: "absolute",
    objectFit: "cover",
    top: 200,
    right: 30,
    boxShadow: "0px 15px 25px rgba(0,0,0,0.50)",
    [theme.breakpoints.down("md")]:{
      display: "none"
    },
  },
  imgMobile:{
    [theme.breakpoints.up("md")]:{
      display: "none"
    },
    [theme.breakpoints.down("md")]:{
      position: "absolute",
      width: "100%",
      height: "calc(100vh - 64px)",
      opacity: 0.5,
      objectFit: "cover",
    },
  },
}));

export default function Home (){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return(
    <>
      <Box className={classes.root}>
        <img className={classes.imgMobile} src={Fondo3} alt="fondo-mobile"/>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            El conocimiento es poder
          </Typography><br/>
          <Typography variant="h6" >
            Mejora tu rendimiento académico con Express.<br/>
            Es momento de aprender y descubrir el mundo de la ingeniería de software.
          </Typography><br/>
          <Button
            title="Iniciar"
            onClick={handleOpen}
            size="large"
            endIcon={<KeyboardArrowRightIcon/>}
            />
        </Box>
        <Box className={classes.footer}>
          <img className={classes.img1} src={Fondo1} alt="img1"/>
          <img className={classes.img2} src={Fondo2} alt="img2"/>
          <img className={classes.img3} src={Fondo3} alt="img3"/>
        </Box>
       <Login open={open} handleClose={handleClose}/> 
      </Box>
    </>
  );
}