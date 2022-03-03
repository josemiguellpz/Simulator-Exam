import React, {useState, useEffect} from 'react';
import { makeStyles, styled } from "@mui/styles";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
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

import {TopicRegister, QuestionRegister, QuestionUpdate, QuestionGet, QuestionDelete, SubtopicRegister} from '../Application/Teacher.logic';
import {acquireTopics, acquireSubtopics, addItemQuestionList, updateItemQuestionList, deleteItemQuestionList, deleteAllQuestionList,} from '../../Redux/Slices';
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
    marginTop: 30,
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    paddingBottom: 30,
    [theme.breakpoints.down("md")]:{
      width: 530,
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
  selectForQuestions:{
    width: 550,
    display: "flex",
    flexWrap: "wrap",
    gap: 35,
    justifyContent: "center",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    paddingTop: 50,
    paddingBottom: 30,
    marginTop: 30,
  },
  buttonsQuestion:{
    [theme.breakpoints.down("sm")]:{
      width: 400,
    },
  },
  review:{
    marginTop: 50,
    width: 800,
    [theme.breakpoints.down("md")]:{
      width: 600,
    },
    [theme.breakpoints.down("sm")]:{
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
  const options = [ {id: 0, value: "Nuevo Tema", }, {id: 1, value: "Nuevo Subtema", }, {id: 2, value: "Nueva Pregunta", }, ];
  const [loading, setLoading] = useState(false);
  const [bandQuestions, setBandQuestions] = useState(false); // Open Card Questions And Open Table
  const dispatch = useDispatch();
  const topics = useSelector(state => state.slices.topicsList);
  const subtopics = useSelector(state => state.slices.subtopicsList);
  const questionList = useSelector(state => state.slices.questionsList);  // List in RunTime
  const [currentTopic, setCurrentTopic] = useState({});                   // Registered Topic
  const [currentQuestion, setCurrentQuestion] = useState(Number);         // Save QuestionID for Update
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
  
  // Option: Select topic or new topic
  const [option, setOption] = useState(5); // Initial value its irrelevant
  const handleOption = (e) => {
    setOption(e.target.value);
    setNewTopic({topic: "", subtopic: ""});
    setQuestion({question: "",correct: "",incorrect1: "",incorrect2: "",incorrect3: "",argument: "",});
    setCurrentTopic({});
    setOpen(false);
    setBandQuestions(false);
    dispatch(deleteAllQuestionList());  // Delete QuestionList in Store
    dispatch(acquireTopics());          // Refresh Topics List in Store
  }
  
  // Variables and Functions for New Topic and Subtopic
  const [newTopic, setNewTopic] = useState({topic: "", subtopic: ""});              // Topic to register 
  const [newSubtopic, setNewSubtopic] = useState({subtopicID: null, subtopic: ""}); // Subtopic to register 
  const [newQuestion, setQuestion] = useState({
    question: "",
    correct: "",
    incorrect1: "",
    incorrect2: "",
    incorrect3: "",
    argument: "",
  });
  const [update, setUpdate] = useState(true); // Disable Button "Actualizar"
  const handleNewTopic    = (e) => setNewTopic({ ...newTopic, [e.target.name]: e.target.value });
  const handleNewSubtopic = (e) => setNewSubtopic({...newSubtopic, [e.target.name]: e.target.value});
  const handleNewQuestion = (e) => setQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  const handleClear = (e) => setQuestion({...newQuestion, question: "", correct: "", incorrect1: "", incorrect2: "", incorrect3: "", argument: "",});

  const handleChange = () => {
    if(option === 2){
      if(Object.keys(currentTopic).length <= 2){
        setOpen(true);
        setAlert(false);
        setAlertContent("Seleccione tema y subtema");
      }else{
        setOption(5);
        setBandQuestions(true);
      }
    } else{
      setOption(5);
      setBandQuestions(true);
    }
  }

  async function handleRegisterTopic(e) {
    e.preventDefault();
    const response = await TopicRegister(newTopic);
    const {status, info, ids} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if (status){
      setCurrentTopic(ids);
      handleChange();
    }
  }
  
  async function handleRegisterSubtopic(e){
    e.preventDefault();
    const response = await SubtopicRegister(currentTopic, newSubtopic);
    const {status, info, topic} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      setCurrentTopic(topic);
      handleChange();
    }
  }

  async function handleRegisterQuestion(e) {
    e.preventDefault();
    const response = await QuestionRegister(currentTopic, newQuestion);
    const {status, info, quest} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      dispatch(addItemQuestionList(quest));
      setUpdate(true);
      handleChange();
    }
  }

  async function handleUpdateQuestion(e){
    e.preventDefault();
    const {topicID, subtopicID} = currentTopic;
    const response = await QuestionUpdate(newQuestion, topicID, subtopicID, currentQuestion);
    const {status, info, quest} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      dispatch(updateItemQuestionList(quest));
      setUpdate(true);
      handleChange();
    }
  }

  async function handleDeleteQuestion(questionID){
    const {topicID, subtopicID} = currentTopic;
    const response = await QuestionDelete(topicID, subtopicID, questionID);
    const {status, info} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      dispatch(deleteItemQuestionList(questionID));
      handleChange();
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
    setUpdate(false);
    handleChange();
  }
  
  async function handleFinish (){
    dispatch(acquireTopics());
    dispatch(deleteAllQuestionList()); // Delete QuestionList in Store
    setNewTopic({topic: "", subtopic: ""});
    setNewSubtopic({subtopicID: null, subtopic: ""});
    setQuestion({question: "",correct: "",incorrect1: "",incorrect2: "",incorrect3: "",argument: "",});
    setCurrentTopic({});
    setOption(option)
    setOpen(false);
    setBandQuestions(false);
    window.location.reload(false);
  }

  const handleCallSubtopics = (e) => {
    dispatch(acquireSubtopics(e.target.value.id)); // Params: TopicID
    setCurrentTopic({ ...currentTopic, 'topicID': e.target.value.id, 'topic': e.target.value.value });
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
          
          {/* If: New Topic */}
          {option === 0 &&(
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

          {/* If: New Subtopic */}
          {option === 1 &&(
            <Box className={classes.selectForQuestions}>
              <InputSelect
                select
                name="id-topic"
                label="Selecciona un Tema"
                widthText={450}
              >
                {topics.map((option) =>(
                  <MenuItem key={option.id} value={option.id} onClick={() => {setCurrentTopic({topicID: option.id, topic: option.value})}}>
                    {option.value}
                  </MenuItem>
                ))}
              </InputSelect>
              <form className={classes.containerFrom} onSubmit={handleRegisterSubtopic}>
                <InputText
                  type="text"
                  name="subtopic"
                  label="Subtema"
                  placeholder="Ingrese el nombre del subtema"
                  value={newSubtopic.subtopic}
                  onChange={handleNewSubtopic}
                  widthText={450}
                />
                <Button
                  title="Continuar"
                  type="submit"
                  onClick={handleRegisterSubtopic}
                />
              </form>
            </Box>
          )}
          
          {/* If: New Question */}
          {option === 2 &&(
            <Box className={classes.selectForQuestions}>
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
              <Button title="Continuar" onClick={handleChange} />
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
                <Box className={classes.buttonsQuestion} sx={{display: "flex", gap: 1}}>
                  <Button
                    title="Agregar"
                    type="submit"
                    onClick={handleRegisterQuestion}
                  />
                  <Button
                    title="Limpiar"
                    onClick={handleClear}
                  />
                  <Button
                    title="Actualizar"
                    disabled={update}
                    onClick={handleUpdateQuestion}
                  />
                  <Button
                    title="Finalizar"
                    onClick={handleFinish}
                  />
                </Box>
              </form>
            </Box>
            
            <Box className={classes.review}>
              <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Tema: {currentTopic.topic}</StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell>Subtema: {currentTopic.subtopic}</StyledTableCell>
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
                            onClick={() => {handleEdit(row.id)}}
                            />
                          <Button
                            title="Eliminar"
                            onClick={() => {handleDeleteQuestion(row.id)}}
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