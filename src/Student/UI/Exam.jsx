/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles, styled } from "@mui/styles";
import { green, red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

import ModalConfirm from '../../Components/ModalConfirm';
import Button from '../../Components/ButtonSimple';

import { ExamRegister, ExamUpdate } from '../Application/Student.logic';
import { useDispatch, useSelector } from 'react-redux';
import { acquireAllTopics, acquireExam, acquireUser } from '../../Redux/Slices';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  title:{
    color: `${theme.palette.secondary.main} !important`,
  },
  cardExam:{
    width: 800,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30,
    marginBottom: 50,
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    [theme.breakpoints.down("md")]:{
      width: 700,
      marginBottom: 30,
      marginTop: 10,
    },
    [theme.breakpoints.down("sm")]:{
      width: 500,
    },
  },
  question:{
    width: 740,
    [theme.breakpoints.down("md")]:{
      width: 640,
    },
    [theme.breakpoints.down("sm")]:{
      width: 440,
    },
  },
  results:{
    width: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]:{
      width: 700,
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]:{
      width: 500,
      alignItems: "center",
    },
  },
  details:{
    width: 1000,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 50,
    [theme.breakpoints.down("md")]:{
      width: 700,
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]:{
      width: 500,
      alignItems: "center",
    },
  },
  answers:{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 1,
  },
}));

export default function Exam(){
  const {topicID, topic} = useParams();
  const matricula = localStorage.getItem('id');
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector(state => state.slices.user);
  const exam = useSelector(state => state.slices.exam);
  const answers = useSelector(state => state.slices.answers);
  const [band, setBand] = useState(true);
  const [historyID, setHistoryID] = useState(0);

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  // Exam
  const [points, setPoints] = useState(0);    // Exam points
  const [index, setIndex] = useState(0);      // Index in Exam
  const [value, setValue] = useState('');     // Value Current Answer 
  const handleValueRadio = (event) => setValue(event.target.value);
  const qualification = ((points*100)/15).toFixed(1);
  const incorrects = 15-points;

  useEffect(() => {
    dispatch(acquireUser(matricula));
    dispatch(acquireAllTopics());
    dispatch(acquireExam(topicID));
    const saveExam = async () => {
      const response = await ExamRegister(matricula, topicID, 0, 15, 0);
      const {historyID} = response.data;
      setHistoryID(historyID);
    }
    saveExam()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function handleCheckAnswer(){
    if(value === exam[index].correct)
      setPoints(points+1)
    setIndex(index+1);
    setValue('');
  };

  if (index === 15){
    ExamUpdate(historyID, topicID, points, incorrects, qualification);
    setBand(false);
    setIndex(0);
    setValue('')
  }

  const handleSaveResults = async () => await ExamUpdate(historyID, topicID, points, incorrects, qualification);  

  function showQualification (){
    if(qualification < 60)
      return `Insuficiente / ${qualification}` 
    if(qualification >= 60 && qualification < 70)
      return `Regular / ${qualification}` 
    if(qualification >= 70 && qualification < 80)
      return `Bueno / ${qualification}` 
    if(qualification >= 80 && qualification < 90)
      return `Muy bueno / ${qualification}` 
    if(qualification >= 90)
      return `Excelente / ${qualification}` 
  }

  return(
    <Box className={classes.root}>
        {band ? (
          /* Running the Exam */
          <Box className={classes.cardExam}>
            {exam.map(function(current, i){
              if(index === i)
                return(
                  <form onSubmit={handleCheckAnswer}>
                    <FormControl sx={{alignItems: "center"}}>
                      <Box sx={{marginBottom: 3}}>
                        <Typography className={classes.title}> 
                          <b> Tema: {topic} </b> <br />
                          <b> Subtema: {current.subtopic} </b>
                        </Typography>
                        <Typography className={classes.title} sx={{textAlign: "end"}}> 
                          <b> Puntos: {points}/15 </b> <br />
                        </Typography> 
                        <Divider>
                          <Chip label={index+1}/>
                        </Divider> <br />
                        <Typography className={classes.title} sx={{fontWeight: "bold",}}>Pregunta</Typography> <br />
                        <Typography className={classes.question} sx={{ textAlign:"justify"}}>{current.question}</Typography> <br /> 
                        <RadioGroup
                          name="quiz"
                          value={value}
                          onChange={handleValueRadio}
                        >
                          {answers.map(function(current, j){
                            if(i === j)
                              return (
                                <>
                                  <FormControlLabel value={current[0]} control={<Radio />} label={current[0]} />
                                  <FormControlLabel value={current[1]} control={<Radio />} label={current[1]} />
                                  <FormControlLabel value={current[2]} control={<Radio />} label={current[2]} />
                                  <FormControlLabel value={current[3]} control={<Radio />} label={current[3]} />
                                </>
                              );
                          })}
                        </RadioGroup>
                      </Box>
                      <Box sx={{display: "flex", gap: 10}}>
                        <Button
                          type='submit'
                          title="Continuar"
                          onClick={handleCheckAnswer}
                        />
                        <Button
                          title="Finalizar"
                          onClick={handleOpenModal}
                        />
                      </Box>
                    </FormControl>
                  </form>
                );
            })}
          </Box>
        ):(
          /* Exam Results */
          <Box className={classes.results}>
            <Box className={classes.details} sx={{marginBottom: 5}}>
              <Typography className={classes.title} variant="h4">
                <b> Resultados Finales </b> <br />
              </Typography> 
              <Grid container spacing={3}>
                <Grid item xs={6} md={8}>
                  <Item><b> Alumno(a): {student.name} {student.lastName} </b></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Item><b> Matricula: {matricula} </b></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Item><b> {showQualification()} </b></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Item><b> Preguntas correctas: {points} </b></Item>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Item><b> Preguntas incorrectas: {incorrects} </b></Item>
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{display: "flex", gap: 5, marginBottom: 5}}>
              <Button
                title="Nuevo intento"
                onClick={()=>{window.location.reload(false)}}
              />
              <Button
                title="Salir"
                onClick={()=>{navigate(-1)}}
              />
            </Box>
            
            <Box sx={{marginBottom: 5}}>
              <Typography className={classes.title} variant="h5">
                <b> Retroalimentación: {topic}</b>
              </Typography> <br />
              {exam.map(function(current, i){
                return(
                  <Box sx={{marginBottom: 5}}>
                    <Typography className={classes.title}>
                      <b> Subtema: {current.subtopic} </b>
                    </Typography>
                    <Typography className={classes.title}>
                      <b> Pregunta </b>
                    </Typography> <br />
                    <Typography sx={{ textAlign:"justify"}}>
                      {i+1}.- {current.question}
                    </Typography> <br /> 
                    
                    <Box className={classes.answers}>
                      <CheckCircleIcon sx={{ color: green[500] }}/> {current.correct}
                    </Box>
                    <Box className={classes.answers}>
                      <CloseIcon sx={{ color: red[500] }}/> {current.incorrect1}
                    </Box>
                    <Box className={classes.answers}>
                      <CloseIcon sx={{ color: red[500] }}/> {current.incorrect2}
                    </Box>
                    <Box className={classes.answers}>
                      <CloseIcon sx={{ color: red[500] }}/> {current.incorrect3}
                    </Box><br />

                    <Typography sx={{textAlign: "justify"}}>
                      <b> Argumentación </b> <br /> 
                      {current.argument} <br />
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

      <ModalConfirm 
        titleModal="Finalizar simulación"
        description="Se evaluarán los resultados obtenidos al momento"
        titleButton="Confirmar"
        handleButton={
          () => {
            handleCloseModal(); 
            setBand(false); 
            handleSaveResults();
          }
        }
        open={open} 
        handleClose={handleCloseModal}
      /> 
    </Box>
  );
}