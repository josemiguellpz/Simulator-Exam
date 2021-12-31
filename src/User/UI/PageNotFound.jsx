import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Error from '../../Assets/error.jpg';

const useStyles = makeStyles((theme) => ({
  root:{
    /* border: "solid 1px", */
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 100,
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
  const classes = useStyles({role});
  return(
    <>
      <Box className={classes.root}>
        <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}> 
          Pagina no encontrada
        </Typography>
        <Typography variant="h6"> Algo salio mal</Typography>
        <img className={classes.img} src={Error} alt="img-error"/>
      </Box>
    </>
  );
};
