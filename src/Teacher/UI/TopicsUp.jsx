import React, {useState, useEffect} from 'react';
import { makeStyles, styled } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputSelect from '../../Components/InputSelect';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import LoadingSpinner from '../../Components/LoadingSpinner';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import InputText from '../../Components/InputText';
import Button from '../../Components/ButtonSimple';

import { useDispatch, useSelector } from 'react-redux';
import {updateQuestionList, acquireTopics} from '../../Redux/Slices/Topics';
import {TopicRegister, QuestionRegister} from '../Application/Teacher.logic';

// Table styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.tertiary.light,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
  review:{
    marginTop: 50,
    width: 800,
    [theme.breakpoints.down("md")]:{
      width: 500,
    },
  },
  buttonsTable:{
    display: "flex",
    gap: 4,
    [theme.breakpoints.down("md")]:{
      flexWrap: "wrap"
    },
  },
}));

export default function TopicsUp(){
  const classes = useStyles();
  const description = "En este apartado puedes dar de alta nuevos temas con sus respectivas preguntas, al terminar el proceso los alumnos podrán disponer de su contenido. Para continuar indica que tipo de operación desea realizar y llene los campos."
  const options = [ {id: 0, value: "Tema existente", }, {id: 1, value: "Nuevo tema", }, ];
  const [loading, setLoading] = useState(false);
  const [bandQuestions, setBandQuestions] = useState(false); // Open Card Questions And Open Table
  const dispatch = useDispatch();
  const topics = useSelector(state => state.topics.topicsList);
  // const subtopics = useSelector(state => state.topics.subtopicsList);
  const subtopics = [];
  const questionList = useSelector(state => state.topics.questionsList); // List in RunTime
  
  // Alert
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  
  const showAlert = (alert, alertContent) => {
    return(
      <>
      {alert ? (
        <Alert className={classes.alert} variant="filled" severity="success" action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
          {alertContent}
        </Alert>
      ):(
        <Alert className={classes.alert} variant="filled" severity="error" action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
          {alertContent}
        </Alert>
      )}
      </>
    );
  };
  
  // Option: Select topic or new topic
  const [option, setOption] = useState(5); // Initial value its irrelevant
  const handleOption = (e) => {
    setOption(e.target.value);
    setBandQuestions(false);
  }
  
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
    const {status, info} = await TopicRegister(newTopic);
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if (status){
      console.log(newTopic)
      setOption(5);
      setBandQuestions(true);
    }
  }
  
  async function handleRegisterQuestion(e) {
    e.preventDefault();
    const {status, info, quest} = await QuestionRegister(newQuestion);
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      console.log(quest)
      dispatch(updateQuestionList(quest));
      setOption(5);
      setBandQuestions(true);
    }
  }
  
  const handleChangeTopic = () => {}
  const handleChangeSubtopic = () => {}
  const handleEdit = () => {}
  const handleDelete = () => {}

  const handleClear = (e) => setQuestion({...newQuestion, question: "", correct: "", incorrect1: "", incorrect2: "", incorrect3: "", argument: "",})
  
  useEffect(() => {
    const request = async () => {
      setLoading(true);
      dispatch(acquireTopics());
      setLoading(false);
    }
    request()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

        {/* Input: Type of operation */}
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

        {/* Generic Alert */}
        {open && ( showAlert(alert, alertContent) )}

          {/* If: Topic Exist */}
          {option === 0 &&(
            <Box>
              <Typography>Selecciona un Tema</Typography>
              <form className={classes.containerFrom} onSubmit={null}>
                <InputSelect
                  select
                  name="id-topic"
                  label="Listado de Temas"
                  widthText={300}
                  onChange={null}
                >
                  {topics.map((option) =>(
                    <MenuItem key={option.id} value={option.id} onClick={handleChangeTopic}>
                      {option.value}
                    </MenuItem>
                  ))}
                </InputSelect>
                <InputSelect
                  select
                  name="id-topic"
                  label="Listado de Subtemas"
                  widthText={300}
                  onChange={null}
                >
                  {subtopics.map((option) =>(
                    <MenuItem key={option.id} value={option.id} onClick={handleChangeSubtopic}>
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

          {/* If: New Topic */}
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

          {/* Inputs: New Question */}
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
            
            <Box className={classes.review}>
              <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Tema: {newTopic.topic}</StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>Subtema: {newTopic.subtopic}</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionList.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell scope="row" sx={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                        {row.quest}
                        <Box className={classes.buttonsTable}>
                          <Button
                            title="Editar"
                            onClick={handleEdit}
                            />
                          <Button
                            title="Eliminar"
                            onClick={handleDelete}
                            />
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            </Box>
            </>
          )}

      </Box>
    </>
  );
}