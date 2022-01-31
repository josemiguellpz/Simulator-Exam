import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Class from '../../Assets/class.jpg';
import LoadingSpinner from '../../Components/LoadingSpinner';
import Button from '../../Components/ButtonSimple';
import StudentModel from '../Domain/Student.model';
import {getUser} from '../../Axios/Provider';

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
      marginTop: 70,
      zIndex: 1,
    },
  },
  title:{
    color: `${theme.palette.secondary.main} !important`,
  },
  images:{
    width: 600,
    height: 300,
    marginLeft: 100,
    objectFit: "cover",
    borderRadius: "6px",
    boxShadow: "0px 15px 25px rgba(0,0,0,0.50)",
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
  const matricula = localStorage.getItem("id");
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(new StudentModel());
  
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const response = await getUser(matricula);
      const {role, name, lastName, carrer} = response.data.info;
      setStudent(new StudentModel(role, name, lastName, carrer));
      setLoading(false);
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if(loading) return <LoadingSpinner />
    
  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            ¡Bienvenido {student.name} {student.lastName}!
          </Typography><br/>
          <Typography variant="h6" >
            <ArrowRightIcon/> Realiza exámanes en todo momento.<br/>
            <ArrowRightIcon/> Accede el temario disponible.<br/>
            <ArrowRightIcon/> Consulta tu rendimiento académico.<br/>
          </Typography><br/>
          <Button
            title="Comenzar Ahora"
            onClick= {() => {navigate('/student/topics')}}
            size="large"
            endIcon={<KeyboardArrowRightIcon/>}
            />
        </Box>
        <img className={classes.images} src={Class} alt="background"/>
      </Box>
    </>
  );
};
