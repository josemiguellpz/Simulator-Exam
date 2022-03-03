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

import InputSelect from '../../Components/InputSelect';
import Button from '../../Components/ButtonSimple';

import { TopicDelete, SubtopicDelete, QuestionDelete } from '../Application/Teacher.logic';
import {acquireTopics, acquireSubtopics, acquireQuestions, deleteItemQuestionList, deleteAllSubtopicList, deleteAllQuestionList} from '../../Redux/Slices';
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
  topics:{
    width: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    paddingTop: 50,
    paddingBottom: 30,
    marginTop: 30,
  },
  buttonsDelete:{
    [theme.breakpoints.down("sm")]:{
      width: 400,
      display: "flex",
      flexWrap: "wrap",
      gap: 20,
    },
  },
  review:{
    marginTop: 30,
    width: 900,
    [theme.breakpoints.down("md")]:{
      width: 700,
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
}))

export default function TopicsDown(){
  const classes = useStyles();
  const description = "En este apartado puedes dar de baja algún tema que consideres que ya no sea adecuado en los exámenes o incluso borrar aquellas preguntas que ya no sean relevantes en un subtema."
  const tip = " Borrar un tema conlleva a eliminar todos los subtemas relacionados a dicho tema y por ende todas sus preguntas."
  const [band, setBand] = useState(false);
  const dispatch = useDispatch();
  const topics = useSelector(state => state.slices.topicsList);
  const subtopics = useSelector(state => state.slices.subtopicsList);
  const questionList = useSelector(state => state.slices.questionsList);

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

  // First Card
  const [topicDelete, setTopicDelete] = useState({});
  const handleTopic = (e) => setTopicDelete({ ...topicDelete, 'topicID': e.target.value.id, 'topic': e.target.value.value });
  async function handleDeleteTopicOne(){
    if(Object.keys(topicDelete).length !== 2){
      setOpen(true);
      setAlert(false);
      setAlertContent("Seleccione tema");
    }
    else{
      const {topicID} = topicDelete;
      const response = await TopicDelete(topicID);
      const {status, info} = response.data;
      setOpen(true);
      setAlert(status);
      setAlertContent(info);
      if(status){
        dispatch(acquireTopics());
        setTopicDelete({});
        window.location.reload(false);
      }
    }
  }

  // Second Card
  const [currentTopic, setCurrentTopic] = useState({});
  const handleCurrentTopic    = (e) => setCurrentTopic({ ...currentTopic, 'subtopicID': e.target.value.id, 'subtopic': e.target.value.value });
  const handleCallSubtopics = (e) => {
    dispatch(acquireSubtopics(e.target.value.id)); // Params: TopicID
    setCurrentTopic({ ...currentTopic, 'topicID': e.target.value.id, 'topic': e.target.value.value });
  }

  
  const handleChange = () => {
    if(Object.keys(currentTopic).length <= 2){
      setOpen(true);
      setAlert(false);
      setAlertContent("Seleccione tema y subtema");
    }
    else{
      dispatch(acquireQuestions(currentTopic.topicID, currentTopic.subtopicID));
      setBand(true);
    }
  }

  async function handleDeleteTopic() {
    const {topicID} = currentTopic;
    const response = await TopicDelete(topicID);
    const {status, info} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      dispatch(acquireTopics());
      dispatch(deleteAllQuestionList());
      setCurrentTopic({});
      setBand(false);
      window.location.reload(false);
    }
  }
  
  async function handleDeleteSubtopic() {
    const {topicID, subtopicID} = currentTopic;
    const response = await SubtopicDelete(topicID, subtopicID);
    const {status, info} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status){
      dispatch(deleteAllQuestionList());
      setCurrentTopic({});
      setBand(false);
      window.location.reload(false);
    }
  }

  async function handleDeleteQuestion(questionID){
    const {topicID, subtopicID} = currentTopic;
    const response = await QuestionDelete(topicID, subtopicID, questionID);
    const {status, info} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
    if(status)
      dispatch(deleteItemQuestionList(questionID));
  }

  const handleCancel = () =>{
    dispatch(acquireTopics());         // Refresh TopicList in Store
    dispatch(deleteAllQuestionList()); // Delete QuestionList in Store
    dispatch(deleteAllSubtopicList()); // Delete SubtopicList in Store
    setCurrentTopic({});               // Refresh State
    setBand(false);
  }

  useEffect(() => {
    const request = async () => { dispatch(acquireTopics()); }
    request();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return(
    <>
      <Box className={classes.root} sx={{paddingBottom: "25vh"}}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Dar de Baja Temas
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}> {description}<br/> </Typography><br/>
          <Typography className={classes.title} variant="h7" sx={{fontWeight: "bold", textAlign: "justify"}}>
            <TipsAndUpdatesIcon/>{tip}<br/>
          </Typography><br/>
        </Box>

        {/* Generic Alert */}
        {open && ( showAlert(alert, alertContent) )}

        {band === false &&(
          <>
          <Box className={classes.topics} sx={{paddingTop: "3vh"}}>
            <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold"}}>
              Baja de Tema
            </Typography>
            <InputSelect
              select
              name="topic"
              label="Selecciona un Tema"
              widthText={300}
              onChange={handleTopic}
            >
              {topics.map((option) =>(
                <MenuItem key={option.id} value={option}>
                  {option.value}
                </MenuItem>
              ))}
            </InputSelect>
            <Button title="Confirmar" onClick={handleDeleteTopicOne} />
          </Box>
          <Box className={classes.topics} sx={{paddingTop: "3vh"}}>
            <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold"}}>
              Baja de Subtema y Preguntas
            </Typography>
            <InputSelect
              select
              name="topic"
              label="Selecciona un Tema"
              widthText={300}
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
              widthText={300}
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
          </>
        )}

        {band &&(
          <Box className={classes.review}>
            <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold", textAlign: "justify", paddingBottom: "3vh"}}>
              Tema: {currentTopic.topic}
            </Typography>
            <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold", textAlign: "justify", paddingBottom: "3vh"}}>
              Subtema: {currentTopic.subtopic}
            </Typography>

            <Box className={classes.buttonsDelete} sx={{display: "flex", paddingBottom: "5vh", justifyContent: "space-around"}}>
              <Button
                title="Eliminar Tema"
                onClick={() => {handleDeleteTopic()}}
              />
              <Button
                title="Eliminar Subtema"
                onClick={() => {handleDeleteSubtopic()}}
              />
              <Button
                title="Cancelar"
                onClick={() => {handleCancel()}}
              />
            </Box>

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
                          title="Eliminar"
                          onClick={() => {handleDeleteQuestion(row.id)}}
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