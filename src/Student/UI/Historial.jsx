import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles, styled} from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import ModalConfirm from '../../Components/ModalConfirm';
import Button from '../../Components/ButtonSimple';
import BarChart from '../../Components/BarChart';

import { useDispatch, useSelector } from 'react-redux';
import { acquireAllTopics, acquireUser } from '../../Redux/Slices';
import { HistoryGet } from '../Application/Student.logic';

// Table styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.secondary.light,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
      width: 500,
      alignItems: "center",
    },
  },
  title:{
    color: `${theme.palette.secondary.main} !important`,
  },
  topics:{
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
    paddingBottom: 40,
    alignItems: "center",
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
  statistics:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  barChart:{
    width: 800,
    [theme.breakpoints.down("md")]:{
      width: 600,
    },
    [theme.breakpoints.down("sm")]:{
      width: 400,
    },
  },
  buttons:{
    display: "flex", 
    gap: 20, 
    marginTop: 30, 
    justifyContent: "center",
    [theme.breakpoints.down("md")]:{
      
    },
  },
  attempts:{
    width: 1000,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    [theme.breakpoints.down("md")]:{
      width: 700,
    },
    [theme.breakpoints.down("sm")]:{
      width: 500,
    },
  },
  table:{
    width: 800,
    [theme.breakpoints.down("md")]:{
      width: 600,
    },
    [theme.breakpoints.down("sm")]:{
      width: 500,
    },
  },
}));

export default function HistorialStudent() {
  const classes = useStyles();
  const description = "En esta sección puedes consultar tus resultados de cada examen que realizas, selecciona un tema para ver más información o realiza un nuevo intento. Tus resultados no afectan tu calificación final, recuerda que tu docente profesor tambien puede observar tu progreso.";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const topics = useSelector(state => state.slices.topicsList);
  const student = useSelector(state => state.slices.user);
  const [band, setBand] = useState(true);
  const [currentTopic, setCurrentTopic] = useState({});
  const [attempts, setAttempts] = useState(0);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const matricula = localStorage.getItem('id');
    dispatch(acquireUser(matricula));
    dispatch(acquireAllTopics());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  //BarChar
  const labels = ['Calificación', 'Respuestas Correctas', 'Respuestas Incorrectas'];
  const [data, setData] = useState({});
  
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);


  const handleGoToExam = () => navigate(`exam/t-Id=0${currentTopic.topicID}/name=${currentTopic.topic}`);
  
  async function handleGetHistorial (topicID, topic) {
    setCurrentTopic({...currentTopic, 'topicID': topicID, 'topic': topic});
    const response = await HistoryGet(student.id, topicID);
    const {attempts, history, average} = response.data;
    setAttempts(attempts);
    setHistorial(history.filter((item)=>{
      /* Date Format */
      const date = new Date(item.date);
      const year = date.toISOString().substring(0, 4);
      const month = date.toISOString().substring(5, 7);
      const day = date.toISOString().substring(8, 10);
      item.date = ( day  + '/' + month + '/' + year )
      return item;
    }));
    setData({
      labels,
      datasets: [
        {
          label: 'En promedio',
          data: average,
          backgroundColor: '#8c52ff',
        },
      ],
    })
    setBand(false);
  }

  return(
    <>
      <Box className={classes.root}>
        {band ? (
          /* Info and Topic List */
          <>
          <Box className={classes.info}>
            <Typography className={classes.title} variant="h4">
              <b> Historial Académico </b> 
            </Typography><br/>
            <Typography variant="h6" sx={{textAlign: "justify"}}>
              {description}
            </Typography><br/>
          </Box>

          <Box className={classes.topics}>
            <Typography className={classes.title} variant="h5"> 
              <b> Elige un Tema </b> 
            </Typography><br/>

            <List sx={{ width: '100%'}}>
              {topics.map(({topicID, topic, subtopics}) => (
                <>
                <ListItemButton 
                  key={topicID} 
                  className={classes.item} 
                  onClick={
                    () => {
                      handleGetHistorial(topicID, topic);
                    }
                  } 
                  sx={{borderRadius: "6px",}}
                >
                  <ListItemAvatar>
                    <Avatar> 
                      <FolderIcon /> 
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={topic}/>
                </ListItemButton>
                {subtopics.map(({subtopicID, subtopic}) => (
                  <List key={subtopicID} disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemIcon> 
                        <FolderIcon /> 
                      </ListItemIcon>
                      <ListItemText primary={subtopic} />
                    </ListItem>
                  </List>
                ))}
                </>
              ))}
            </List>
          </Box>
          </>
        ) : (
          /* Details Historial */
          <Box className={classes.results}>
            <Box className={classes.details} sx={{marginBottom: 5}}>
              <Typography className={classes.title} variant="h4">
                <b> Resumen Estadístico </b> <br />
              </Typography> 
              {attempts === 0 ? (
                <Box sx={{textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 5}}>
                  <Typography className={classes.title} variant="h5" sx={{marginTop:5}}>
                    <b> Sin datos por mostrar para: {currentTopic.topic} </b> <br /> <br />
                    <b> Te invitamos a realizar un intento </b> <br />
                  </Typography>
                  <Box sx={{display: "flex", gap: 10}}>
                    <Button
                      title="Ir a la simulación"
                      onClick={handleOpenModal}
                    />
                    <Button
                      title="Regresar"
                      onClick={()=>{setBand(true)}}
                    />
                  </Box>
                </Box>
              ): (
                <Box className={classes.statistics}>
                  <Grid container spacing={3} wrap="wrap">
                    <Grid item xs={6} md={6}>
                      <Item><b> Alumno(a): {student.name} {student.lastName} </b></Item>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Item><b> Matricula: {student.id} </b></Item>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Item><b> Intentos: {attempts} </b></Item>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Item><b> Carrera: {student.carrer} </b></Item>
                    </Grid>
                  </Grid>
                  <Box className={classes.buttons}>
                    <Button
                      title="Nuevo intento"
                      onClick={handleOpenModal}
                    />
                    <Button
                      title="Regresar"
                      onClick={()=>{setBand(true)}}
                    />
                  </Box>
                  <Box className={classes.barChart} sx={{marginTop: 5}}>
                    <BarChart
                      data={data}
                    />
                  </Box>
                </Box>
              )}
            </Box>

            <Box sx={{marginBottom: 5}}>
              {attempts === 0 ? (
                <Box sx={{marginBottom: "20vh"}}></Box>
              ):(
                <Box className={classes.attempts}>
                  <Typography className={classes.title} variant="h5">
                    <b> Tema: {currentTopic.topic}</b>
                  </Typography> <br />

                  <Box className={classes.table}>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              <Typography sx={{fontSize: "1rem",}}>
                                Intento
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Typography sx={{fontSize: "1rem",}}>
                                Calificación
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Typography sx={{fontSize: "1rem",}}>
                                Correctas
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Typography sx={{fontSize: "1rem",}}>
                                Incorrectas
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Typography sx={{fontSize: "1rem",}}>
                                Fecha
                              </Typography>
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {historial.map(({historyID, corrects, incorrects, qualification, date}, index) => (
                            <StyledTableRow key={historyID}>
                              <StyledTableCell scope="row">
                                <Typography sx={{fontSize: "1rem",}}>
                                  {index+1}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell scope="row">
                                <Typography sx={{fontSize: "1rem",}}>
                                  {qualification}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell scope="row">
                                <Typography sx={{fontSize: "1rem",}}>
                                  {corrects}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell scope="row">
                                <Typography sx={{fontSize: "1rem",}}>
                                  {incorrects}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell scope="row">
                                <Typography sx={{fontSize: "1rem",}}>
                                  {date}
                                </Typography>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              )}

            </Box>
            
          </Box>
        )}
        <ModalConfirm 
          titleModal="Iniciar simulación del tema:"
          description={`${currentTopic.topic}`}
          titleButton="Confirmar"
          handleButton={
            ()=>{
              handleCloseModal(); 
              handleGoToExam();
            }
          }
          open={open} 
          handleClose={handleCloseModal}
        />
      </Box>
    </>
  );
};
