import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Fondo1 from '../../Assets/fondo1.png';
import Fondo2 from '../../Assets/fondo2.png';

const useStyles = makeStyles((theme) => ({
  root:{

  },
  img:{
    width: 300,
    height: 300,
  },
}))

export default function Home (){
  const classes = useStyles();
  return(
    <>
      <Box className={classes.root}>
        <Typography variant="h3">
          El conocimiento es poder
        </Typography>
        <Typography variant="h5">
          Mejora tu rendimiento academico con Express.
          Es momento de aprender y descurbrir el mundo de la ingenieria de software.
        </Typography>
        <Box>
          <img className={classes.img} src={Fondo1} alt="fondo1"/>
          <img className={classes.img} src={Fondo2} alt="fondo2"/>
        </Box>
      </Box>
    </>
  );
}