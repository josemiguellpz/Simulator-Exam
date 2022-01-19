import React, {useState, useEffect} from 'react';
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputSelect from '../../Components/InputSelect';

import LoadingSpinner from '../../Components/LoadingSpinner';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import InputText from '../../Components/InputText';
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
  const description = "En este apartado puedes dar de alta nuevos temas con sus respectivas preguntas, al terminar el proceso los alumnos podrán disponer de su contenido. Para continuar indica que tipo de operación desea realizar y llene los campos."
  
  const prueba = [
    {id: 10, value: "Calidad", },
    {id: 20, value: "Seguridad", },
    {id: 30, value: "Integridad", },
    {id: 40, value: "Metodologias", },
    {id: 50, value: "Metodologias agiles", },
    {id: 60, value: "SCRUM", },
  ];
  const options = [
    {id: 0, value: "Tema existente", },
    {id: 1, value: "Nuevo tema", },
  ];

  // Option: Select topic or new topic
  const [option, setOption] = useState(5); // Initial value its irrelevant
  const handleOption = (e) => {
    setOption(e.target.value);
    setBandQuestions(false);
  }

  const [bandQuestions, setBandQuestions] = useState(false); // Open Card Questions
  const [list, setList] = useState([]); // Save Questions and map out

  // Data New Topic
  const [newTopic, setNewTopic] = useState({ topic: "", subtopic: "", });
  const [newQuestion, setQuestion] = useState({
    question: "",
    correct: "",
    incorrect1: "",
    incorrect2: "",
    incorrect3: "",
    argument: "",
  });
  const handleNewTopic=(e) => setNewTopic({ ...newTopic, [e.target.name]: e.target.value });
  const handleNewQuestion=(e) => setQuestion({ ...newQuestion, [e.target.name]: e.target.value });

  async function handleRegisterTopic(e) {
    e.preventDefault();
    if (newTopic.topic === "" && newTopic.subtopic === ""){
      // show error
    }else{
      console.log(newTopic)
      setOption(5);
      setBandQuestions(true);
    }
  }
  
  async function handleRegisterQuestion(e) {
    e.preventDefault();
    if (newQuestion.question === "" && newQuestion.correct === "" && newQuestion.incorrect1 === "" && newQuestion.incorrect2 === "" && newQuestion.incorrect3 === "" && newQuestion.argument === ""){
      // show error
    }else{
      // console.log(newQuestion)
      setList(newQuestion.question)
      console.log(list)
      setOption(5);
      setBandQuestions(true);
    }
  }
  const handleClear = (e) => setQuestion({...newQuestion, question: "", correct: "", incorrect1: "", incorrect2: "", incorrect3: "", argument: "",})
  
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
            Dar de Alta Temas <TipsAndUpdatesIcon/>
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            {description}<br/>
          </Typography><br/>
        </Box>
        <Box sx={{paddingTop: 3, paddingBottom: 3}}>
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
              <Typography>Selecciona un Tema SIN IMPLEMENTAR</Typography>
              <form className={classes.containerFrom} onSubmit={null}>
                <InputSelect
                  select
                  name="id-topic"
                  label="Listado de Temas"
                  widthText={300}
                  onChange={null}
                >
                  {prueba.map((option) =>(
                    <MenuItem key={option.id} value={option.id}>
                      {option.value}
                    </MenuItem>
                  ))}
                </InputSelect>
                <Button
                  title="Continuar"
                  type="submit"
                  onClick={null}
                />
              </form>
            </Box>
          )}
          {option === 1 &&(
            <Box className={classes.cardForm}>
              <form className={classes.containerFrom} onSubmit={handleRegisterTopic}>
                  <InputText
                    type="text"
                    name="topic"
                    label="Tema"
                    placeholder="Ingrese el nombre del tema"
                    value={newTopic.topic}
                    onChange={handleNewTopic}
                    widthText={380}
                  />
                  <InputText
                    type="text"
                    name="subtopic"
                    label="Subtema"
                    placeholder="Ingrese el nombre del subtema"
                    value={newTopic.subtopic}
                    onChange={handleNewTopic}
                    widthText={380}
                    />
                <Button
                  title="Continuar"
                  type="submit"
                  onClick={handleRegisterTopic}
                />
              </form>
            </Box>
          )}
          {bandQuestions &&(
            <>
            <Box className={classes.cardForm}>
              <form className={classes.containerFrom} onSubmit={handleRegisterQuestion}>
                <InputText
                  type="text"
                  name="question"
                  label="Pregunta"
                  placeholder="Ingrese la pregunta"
                  value={newQuestion.question}
                  onChange={handleNewQuestion}
                  widthText={380}
                />
                <InputText
                  type="text"
                  name="correct"
                  label="Correcta"
                  placeholder="Ingrese la respuesta correcta"
                  value={newQuestion.correct}
                  onChange={handleNewQuestion}
                  widthText={380}
                />
                <InputText
                  type="text"
                  name="incorrect1"
                  label="Incorrecta"
                  placeholder="Ingrese la respuesta incorrecta"
                  value={newQuestion.incorrect1}
                  onChange={handleNewQuestion}
                  widthText={380}
                />
                <InputText
                  type="text"
                  name="incorrect2"
                  label="Incorrecta"
                  placeholder="Ingrese la respuesta incorrecta"
                  value={newQuestion.incorrect2}
                  onChange={handleNewQuestion}
                  widthText={380}
                />
                <InputText
                  type="text"
                  name="incorrect3"
                  label="Incorrecta"
                  placeholder="Ingrese la respuesta incorrecta"
                  value={newQuestion.incorrect3}
                  onChange={handleNewQuestion}
                  widthText={380}
                />
                <InputText
                  type="text"
                  name="argument"
                  label="Argumento"
                  placeholder="Ingrese un argumento"
                  value={newQuestion.argument}
                  onChange={handleNewQuestion}
                  multiline
                  widthText={380}
                />
                <Box sx={{display: "flex", gap: 5}}>
                  <Button
                    title="Agregar"
                    type="submit"
                    onClick={handleRegisterQuestion}
                  />
                  <Button
                    title="Limpiar"
                    onClick={handleClear}
                  />
                </Box>
              </form>
            </Box>
            <Box>
              Aqui van las preguntas que se agregaron
              {list.map((question) => (
                <Typography>{question}</Typography>
              ))}
            </Box>
            </>
          )}

      </Box>
    </>
  );
}