import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LoadingSpinner from '../../Components/LoadingSpinner';
import Button from '../../Components/ButtonSimple';

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
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
    color: `${theme.palette.secondary.main} !important`,
  },
  something:{
    width: 600,
    height: 400,
    display: "flex",
    flexDirection: "column",
    marginLeft: 100,
    marginTop: 40,
    [theme.breakpoints.down("md")]:{
      width: 500,
      marginLeft: 50,
      marginTop: 50,
      marginButtom: 50,
    },
  },
}));

export default function Home() {
  localStorage.setItem("role", "student")
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      await setTimeout(function(){
        setLoading(false)
      }, 3000);
    }
    load()
  }, []);
  
  if(loading){
    return(
      <LoadingSpinner />
    )
  }
    
  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            ¡Bienvenido!
          </Typography><br/>
          <Typography variant="h6" >
            Realiza exámanes en todo momento.<br/>
            Accede el temario disponible.<br/>
            Consulta tu rendimiento académico.<br/>
          </Typography><br/>
          <Button
            title="Comenzar Ahora"
            onClick= {() => {navigate('/student/topics')}}
            size="large"
            endIcon={<KeyboardArrowRightIcon/>}
            />
        </Box>
        <Box className={classes.something}>
          Aqui ira algo...
        </Box>
      </Box>
    </>
  );
};
