import React, {useState, useEffect} from 'react';
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputSelect from '../../Components/InputSelect';

import LoadingSpinner from '../../Components/LoadingSpinner';
/* import InputText from '../../Components/InputText';
import Button from '../../Components/ButtonSimple'; */

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
}));

export default function TopicsUp(){
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const description = "En este apartado puedes modificar las preguntas de cualquier tema, eso incluye respuestas y argumento." 
  const prueba = [
    {id: 10, value: "Calidad", },
    {id: 20, value: "Seguridad", },
    {id: 30, value: "Integridad", },
    {id: 40, value: "Metodologias", },
    {id: 50, value: "Metodologias agiles", },
    {id: 60, value: "SCRUM", },
  ];

  /* const [list, setList] = useState([]); // Save Questions and map out

  // Edit Data Question
  const [newQuestion, setQuestion] = useState({
    question: "",
    correct: "",
    incorrect1: "",
    incorrect2: "",
    incorrect3: "",
    argument: "",
  });
  const handleNewQuestion=(e) => setQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  
  async function handleEditQuestion(e) {
    e.preventDefault();
    if (newQuestion.question === "" && newQuestion.correct === "" && newQuestion.incorrect1 === "" && newQuestion.incorrect2 === "" && newQuestion.incorrect3 === "" && newQuestion.argument === ""){
      // show error
    }else{
      // console.log(newQuestion)
      setList(newQuestion.question)
      console.log(list)
    }
  } */
  
  // Limpiar Campos
  // const handleClear = (e) => setQuestion({...newQuestion, question: "", correct: "", incorrect1: "", incorrect2: "", incorrect3: "", argument: "",})
  
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      await setTimeout(function(){
        setLoading(false)
      }, 3000);
    }
    // load()
  }, []);
  
  if(loading) return <LoadingSpinner />

  return(
    <>
      <Box className={classes.root} sx={{paddingBottom: "20vh"}}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Modificar Preguntas 
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            {description}<br/>
          </Typography><br/>
        </Box>
        <Box sx={{paddingTop: 3, paddingBottom: 3}}>
          <InputSelect
            select
            name="id"
            label="Selecciona el Tema "
            widthText={300}
            onChange={null}
          >
            {prueba.map((option) =>(
              <MenuItem key={option.id} value={option.id}>
                {option.value}
              </MenuItem>
            ))}
          </InputSelect>
        </Box>
      </Box>
    </>
  );
}