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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingSpinner from '../../Components/LoadingSpinner';
import InputSelect from '../../Components/InputSelect';
import InputText from '../../Components/InputText';
import Button from '../../Components/ButtonSimple';

import {QuestionUpdate, QuestionGet, TopicAndSubtopicUpdate} from '../Application/Teacher.logic';
import {acquireTopics, acquireSubtopics, acquireQuestions, deleteAllSubtopicList, deleteAllQuestionList} from '../../Redux/Slices';
import { useDispatch, useSelector } from 'react-redux';

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
    width: 550,
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
    margin: "0 auto",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
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
  topics:{
    width: 550,
    display: "flex",
    flexWrap: "wrap",
    gap: 30,
    justifyContent: "center",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    paddingTop: 50,
    paddingBottom: 30,
    marginTop: 30,
  },
  review:{
    marginTop: 20,
    width: 1000,
    [theme.breakpoints.down("md")]:{
      width: 600,
    },
    [theme.breakpoints.down("sm")]:{
      width: 400,
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
  const [loading, setLoading] = useState(false);
  const description = "En este apartado puedes modificar temas, subtemas y preguntas." 
  const [band, setBand] = useState(true); 
  const [bandTopic, setBandTopic] = useState(false); // Open Card Questions And Open Table
  const [bandQuestions, setBandQuestions] = useState(false); // Open Card Questions And Open Table
  const dispatch = useDispatch();
  const topics = useSelector(state => state.slices.topicsList);
  const subtopics = useSelector(state => state.slices.subtopicsList);
  const questionList = useSelector(state => state.slices.questionsList);  // List in RunTime
  const [currentTopic, setCurrentTopic] = useState({});                   // Registered Topic
  const [currentQuestion, setCurrentQuestion] = useState({});             // Save Question for Update
  const handleCurrentTopic    = (e) => setCurrentTopic({ ...currentTopic, 'subtopicID': e.target.value.id, 'subtopic': e.target.value.value });

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

  const [newTopic, setNewTopic] = useState({});
  const [newQuestion, setQuestion] = useState({
    question: "",
    correct: "",
    incorrect1: "",
    incorrect2: "",
    incorrect3: "",
    argument: "",
  });
  const handleNewTopic = (e) => setNewTopic({ ...newTopic, [e.target.name]: e.target.value });
  const handleNewQuestion = (e) => setQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  const handleClear = (e) => setQuestion({...newQuestion, question: "", correct: "", incorrect1: "", incorrect2: "", incorrect3: "", argument: "",});

  const handleCallSubtopics = (e) => {
    dispatch(acquireSubtopics(e.target.value.id)); // Params: TopicID
    setCurrentTopic({ ...currentTopic, 'topicID': e.target.value.id, 'topic': e.target.value.value });
  } 

  const handleContinue = () => {
    if(Object.keys(currentTopic).length <= 2){
      setOpen(true);
      setAlert(false);
      setAlertContent("Seleccione tema y subtema");
    }
    else{
      dispatch(acquireQuestions(currentTopic.topicID, currentTopic.subtopicID));
      setBand(false);
    }
  }

  const handleEditTopic = () => {
    setNewTopic(currentTopic); 
    setBandTopic(!bandTopic);
  } 
  
  async function handleUpdateTopic(e){
    e.preventDefault();
    const response = await TopicAndSubtopicUpdate(newTopic);
    const {status, info, topic} = response.data
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      setCurrentTopic(topic);
      setBandTopic(false);
    }
  }

  async function handleEdit (questionID){
    const {topicID, subtopicID} = currentTopic;
    const response = await QuestionGet(topicID, subtopicID, questionID);
    const {dataQuestion} = response.data;
    setCurrentQuestion(questionID);
    setQuestion({
      question: dataQuestion.question,
      correct: dataQuestion.correct,
      incorrect1: dataQuestion.incorrect1,
      incorrect2: dataQuestion.incorrect2,
      incorrect3: dataQuestion.incorrect3,
      argument: dataQuestion.argument,
    })
    setBandQuestions(true);
    handleContinue();
  }

  async function handleUpdateQuestion(e){
    e.preventDefault();
    const {topicID, subtopicID} = currentTopic;
    const response = await QuestionUpdate(newQuestion, topicID, subtopicID, currentQuestion);
    const {status, info} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      dispatch(acquireQuestions(currentTopic.topicID, currentTopic.subtopicID));
      setBandQuestions(false);
    }
  }

  const handleCancel = () =>{
    dispatch(acquireTopics());         // Refresh TopicList in Store
    dispatch(deleteAllQuestionList()); // Delete QuestionList in Store
    dispatch(deleteAllSubtopicList()); // Delete SubtopicList in Store
    setCurrentTopic({});               // Refresh State
    setBand(true);
    setBandQuestions(false);
  }

  const handleCancelQuestion = () =>{
    setCurrentQuestion({});               // Refresh State
    setBandQuestions(false);
  }

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
            Modificar Preguntas 
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            {description}<br/>
          </Typography><br/>
        </Box>

        {/* Generic Alert */}
        {open && ( showAlert(alert, alertContent) )}

        {/* Select Topic and Subtopic */}
        {band &&(
          <Box className={classes.topics} sx={{paddingTop: "3vh"}}>
            <InputSelect
              select
              name="topic"
              label="Selecciona un Tema"
              widthText={450}
              onChange={handleCallSubtopics}
            >
              {topics.map((option) =>(
                <MenuItem key={option.id} value={option}>
                  {option.value}
                </MenuItem>
              ))}
            </InputSelect>
            <InputSelect
              select
              name="subtopic"
              label="Selecciona un Subtema"
              widthText={450}
              onChange={handleCurrentTopic}
            >
              {subtopics.map((option) =>(
                <MenuItem key={option.id} value={option}>
                  {option.value}
                </MenuItem>
              ))}
            </InputSelect>
            <Button title="Continuar" onClick={handleContinue} />
          </Box>
        )}

        {/* Info for Topic and Subtopic: Froms and Table */}
        {band === false &&(
          <Box className={classes.review}>
            <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold", textAlign: "justify", paddingBottom: "3vh"}}>
              Tema: {currentTopic.topic}
            </Typography>
            <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold", textAlign: "justify", paddingBottom: "3vh"}}>
              Subtema: {currentTopic.subtopic}
            </Typography>

            <Box sx={{display: "flex", paddingBottom: "5vh", justifyContent: "space-around"}}>
              <Button
                title="Editar Nombre del Tema"
                onClick={() => {handleEditTopic()}}
              />
              <Button
                title="Cancelar"
                onClick={() => {handleCancel()}}
              />
            </Box>

            {/* Update Topic */}
            {bandTopic &&(
              <Box className={classes.cardForm} sx={{marginBottom: "5vh"}}>
                <form className={classes.containerFrom} onSubmit={handleUpdateTopic}>
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
                    title="Confirmar"
                    type="submit"
                    onClick={handleUpdateTopic}
                  />
                </form>
              </Box>
            )}

            {/* Inputs: Update Question */}
            {bandQuestions &&(
              <Box className={classes.cardForm}  sx={{marginBottom: "5vh"}}>
                <form className={classes.containerFrom} onSubmit={handleUpdateQuestion}>
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
                  <Box sx={{display: "flex", gap: 1}}>
                    <Button
                      title="Limpiar"
                      onClick={handleClear}
                    />
                    <Button
                      title="Actualizar"
                      onClick={handleUpdateQuestion}
                    />
                    <Button
                      title="Cancelar"
                      onClick={handleCancelQuestion}
                    />
                  </Box>
                </form>
              </Box>
            )}

            <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Listado de Preguntas</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questionList.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell scope="row" sx={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                      {row.question}
                      <Box className={classes.buttonsTable}>
                        <Button
                          title="Editar"
                          onClick={() => {handleEdit(row.id)}}
                          />
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell scope="row" sx={{display: "flex", justifyContent: "space-around", alignItems: "baseline"}}>
                      <li>
                        <li>Respuesta Correcta: <br/> {row.correct} </li>
                      </li>
                      <li>
                        <li>Respuesta Incorrecta: <br/> {row.incorrect1} </li>
                      </li>
                      {/* <li>
                        <li>Respuesta Incorrecta: <br/> {row.incorrect2} </li>
                      </li>
                      <li>
                        <li>Respuesta Incorrecta: <br/> {row.incorrect3} </li>
                      </li> */}
                      <li>
                        <li>Argumento: <br/> {row.argument}</li>
                      </li>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </>
  );
}