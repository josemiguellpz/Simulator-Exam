import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Class from '../../Assets/class.jpg';
import Classroom from '../../Assets/classroom.jpg';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Button from '../../Components/ButtonSimple';

import { useDispatch, useSelector } from 'react-redux';
import { acquireUser } from '../../Redux/Slices';

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    height: "calc(100vh - 30px)",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
      height: "calc(100vh + 150px)",
    },
    [theme.breakpoints.down("sm")]:{
    
    },
  },
  info:{
    width: 550,
    height: 300,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    marginLeft: 50,
    [theme.breakpoints.down("md")]:{
      marginTop: 100,
      zIndex: 1,
      marginLeft: 0,
    },
    [theme.breakpoints.down("sm")]:{
      width: 400,
      height: 400,
      marginTop: 100,
      marginLeft: 0,
    },
  },
  title:{
    color: `${theme.palette.tertiary.main} !important`,
  },
  images:{
    width: 600,
    height: 300,
    marginLeft: 70,
    objectFit: "cover",
    borderRadius: "6px",
    boxShadow: "0px 15px 25px rgba(0,0,0,0.50)",
    animation: "$slide",
    animationDuration: "5s",
    animationIterationCount: "infinite",
    animationPlayState: "running",
    animationDirection: "alternate-reverse",
    animationTimingFunction: "linear",
    animationDelay: "5s",
    [theme.breakpoints.down("md")]:{
      width: 500,
      marginTop: 20,
      marginLeft: 0,
    },
    [theme.breakpoints.down("sm")]:{
      width: 450,
      height: 250,
      marginBottom: 50,
      marginLeft: 0,
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
  const classes = useStyles({Class, Classroom});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const teacher = useSelector(state => state.slices.user);

  useEffect(() => {
    const matricula = localStorage.getItem('id');
    const load = async () => {
      setLoading(true);
      await setTimeout(function(){
        dispatch(acquireUser(matricula))
        setLoading(false)
      }, 2000);
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if(loading) return <LoadingSpinner />
  
    return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold", textAlign: "center"}}>
            ¡Bienvenido <br/>{teacher.name} {teacher.lastName}!
          </Typography><br/>
          <Typography variant="h6" >
            <ArrowRightIcon/> Agrega nuevo contenido.<br/>
            <ArrowRightIcon/> Actualiza el temario.<br/>
            <ArrowRightIcon/> Consulta el rendimiento académico de los estudiantes.<br/>
          </Typography><br/>
          <Button
            title="Buscar Alumnos"
            onClick= {() => {navigate('/teacher/students')}}
            size="large"
            endIcon={<KeyboardArrowRightIcon/>}
            />
        </Box>
        <img className={classes.images} src={Class} alt="background"/>
      </Box>
    </>
  );
}