import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Class from '../../Assets/class.jpg';
import Classroom from '../../Assets/classroom.jpg';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Button from '../../Components/ButtonSimple';

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    height: "calc(100vh - 30px)",
    display: "flex",
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
    color: `${theme.palette.tertiary.main} !important`,
  },
  images:{
    border: "1px solid",
    width: 500,
    height: 300,
    marginLeft: 100,
    marginTop: 40,
    marginBottom: 100,
    animation: "$slide",
    animationDuration: "5s",
    animationIterationCount: "infinite",
    animationPlayState: "running",
    animationDirection: "alternate-reverse",
    animationTimingFunction: "linear",
    animationDelay: "5s",
    [theme.breakpoints.down("md")]:{
      marginLeft: 50,
    },
    [theme.breakpoints.down("sm")]:{
      width: 450,
      height: 250,
    },
  },
  "@keyframes slide": ({Class, Classroom}) => ({
    "0%":{
      backgroundImage: `url(${Class})`,
    },
    "25%":{
      backgroundImage: `url(${Classroom})`,
    },
    "50%":{
      backgroundImage: `url(${Class})`,
    },
    "75%":{
      backgroundImage: `url(${Classroom})`,
    },
    "100%":{
      backgroundImage: `url(${Class})`,
    }
  }),
}));

export default function Home(){
  localStorage.setItem("role", "teacher")
  
  const classes = useStyles({Class, Classroom});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      await setTimeout(function(){
        setLoading(false)
      }, 2000);
    }
    load()
  }, []);
  
  if(loading) return <LoadingSpinner />
  
    return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            ¡Bienvenido!
          </Typography><br/>
          <Typography variant="h6" >
            Agrega nuevo contenido.<br/>
            Actualiza el temario.<br/>
            Consulta el rendimiento académico de los estudiantes.<br/>
          </Typography><br/>
          <Button
            title="Buscar Alumnos"
            onClick= {() => {navigate('/teacher/students')}}
            size="large"
            endIcon={<KeyboardArrowRightIcon/>}
            />
        </Box>
        <Box className={classes.images}>
          {/* <img className={classes.images} src={Class} alt="background"/> */}
        </Box>
      </Box>
    </>
  );
}