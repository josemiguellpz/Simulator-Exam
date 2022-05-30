import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Error from '../../Assets/error.jpg';
import Button from '../../Components/ButtonSimple';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  components:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 10,
  },
  title:({role}) => ({
    color: 
      role === "user"
        ? `${theme.palette.primary.main} !important`
        : role === "student" 
          ? `${theme.palette.secondary.main} !important`
          : `${theme.palette.tertiary.main} !important`,
  }),
  img:{
    width: 300,
    height: 300,
    objectFit: "cover",
  },
}));

export default function PageNotFound() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const classes = useStyles({role});

  const handleReturn = () => {
    if (role === 'user') 
      navigate('/');
    if (role === 'student') 
      navigate('student/');
    if (role === 'teacher') 
      navigate('teacher/');
  }

  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.components} sx={{marginTop: "10vh", marginBottom: "10vh"}}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold"}}> 
            Pagina no encontrada
          </Typography> <br />
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold"}}> 
            Algo salio mal, intentalo de nuevo o comunicate con tu docente.
          </Typography> <br />
          <img className={classes.img} src={Error} alt="img-error"/>
          <Button
            title="Volver"
            onClick={handleReturn}
            size="large"
            endIcon={<ArrowBackIcon/>}
            />          
        </Box>
      </Box>
    </>
  );
};
