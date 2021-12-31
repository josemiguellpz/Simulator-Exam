import React from 'react';
import { makeStyles} from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
  root:{
    /* border: "solid 1px", */
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    /* [theme.breakpoints.down("md")]:{
      flexDirection: "column",
    }, */
  },
  info:{
    width: 1000,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 50,
    [theme.breakpoints.down("md")]:{
      width: 700,
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]:{
      width: 400,
      alignItems: "center",
    },
  },
  title:{
    color: `${theme.palette.secondary.main} !important`,
  },
  historial:{
    border: "solid 1px",
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
    paddingBottom: 40,
  },
}));

export default function HistorialStudent() {
  const classes = useStyles();
  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Historial Académico
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            En esta sección puedes consultar tus resultados de cada examen que realizas, selecciona un tema para ver
            más información o realiza un nuevo intento. Tus resultados no afectan tu califación final, recuerda que tu 
            docente profesor tambien puede observar tu progreso.<br/>
          </Typography><br/>
        </Box>
        <Box className={classes.historial}>
          Aqui va una lista o tabla
        </Box>
      </Box>
    </>
  );
};
