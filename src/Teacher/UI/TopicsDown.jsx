import React, {useState/* , useEffect */} from 'react';
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputSelect from '../../Components/InputSelect';

// import LoadingSpinner from '../../Components/LoadingSpinner';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Button from '../../Components/ButtonSimple';

const useStyles = makeStyles((theme) => ({
  root:{  
    width: "100%",
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
    color: `${theme.palette.tertiary.main} !important`,
  },
  inputs:{
    display: "flex", 
    felxDirection: "column",
    paddingTop: 3, 
    paddingBottom: 3,
  },
  cardForm:{
    width: 520,
    /* height: teacher ? 440 : 490,
    marginBottom: teacher ? 0 : 10, */
    marginTop: 30,
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    paddingBottom: 30,
    [theme.breakpoints.down("md")]:{
      marginBottom: 30,
      marginTop: 10,
    },
    [theme.breakpoints.down("sm")]:{
      width: 450,
    },
  },
  containerFrom:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
}))

export default function TopicsDown(){
  const classes = useStyles();
  const description = "En este apartado puedes dar de baja algún tema que consideres que ya no sea adecuado en los exámenes o incluso borrar aquellas preguntas que ya no sean relevantes en un tema. Para continuar indique un tema y elija una opción"
  const tip = " Borrar un tema conlleva a eliminar todos los subtemas relacionados a dicho tema y por ende todas sus preguntas."
  const prueba = [
    {id: 10, value: "Calidad", },
    {id: 20, value: "Seguridad", },
    {id: 30, value: "Integridad", },
    {id: 40, value: "Metodologias", },
    {id: 50, value: "Metodologias agiles", },
    {id: 60, value: "SCRUM", },
  ];
  const options = [
    {id: 0, value: "Baja del Tema", },
    {id: 1, value: "Baja de una pregunta", },
  ];

  // Option: Select topic or new topic
  const [option, setOption] = useState(5); // Initial value its irrelevant
  const handleOption = (e) => {
    setOption(e.target.value);
    // setBandQuestions(false);
  }

  return(
    <>
      <Box className={classes.root} sx={{paddingBottom: "20vh"}}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Dar de Baja Temas
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            {description}<br/>
          </Typography><br/>
          <Typography className={classes.title} variant="h7" sx={{fontWeight: "bold", textAlign: "justify"}}>
            <TipsAndUpdatesIcon/>{tip}<br/>
          </Typography><br/>
        </Box>
        <Box className={classes.inputs}>
          <InputSelect
            select
            name="id"
            label="Seleccione un Tema"
            widthText={300}
            disable
            onChange={handleOption}
          >
            {prueba.map((option) =>(
              <MenuItem key={option.id} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </InputSelect>
          <InputSelect
            select
            name="id"
            label="Seleccione un Subtema"
            widthText={300}
            onChange={handleOption}
          >
            {prueba.map((option) =>(
              <MenuItem key={option.id} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </InputSelect>
          
        </Box>
        <Box>
          <InputSelect
            select
            name="id"
            label="Tipo de operación"
            widthText={300}
            onChange={handleOption}
          >
            {options.map((option) =>(
              <MenuItem key={option.id} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </InputSelect>
        </Box>
          {option === 0 &&(
            <Box>
              <Typography>Se eliminara el subtema seleccionado SIN IMPLEMENTAR</Typography>
            </Box>
          )}
          {option === 1 &&(
            <Box>
              <Typography>Selecciona una pregunta SIN IMPLEMENTAR</Typography>
            </Box>
          )}
          {/* <Box>
            Aqui van las preguntas que se agregaron
            {list.map((question) => (
              <Typography>{question}</Typography>
            ))}
          </Box> */}
      </Box>
    </>
  );
}