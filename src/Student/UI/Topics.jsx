import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';

import ModalConfirm from '../../Components/ModalConfirm';

import { useDispatch, useSelector } from 'react-redux';
import { acquireAllTopics } from '../../Redux/Slices';

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
  tip:{
    color: `${theme.palette.secondary.main} !important`,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    [theme.breakpoints.down("md")]:{
      flexWrap: "nowrap"
    },
  },
  topics:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 40,
    [theme.breakpoints.down("sm")]:{
      width: 450,
      marginBottom: 40,
    },
  },
  item:{
    "&:hover": {
      color: "#fff !important",
      fontWeight: "600",
      background:`${theme.palette.secondary.main} !important`,
    },
  },
}));

export default function TopicsStudent() {
  const classes = useStyles();
  const description = "Para realizar la simulaci??n del examen (15 reactivos) elige un tema para ser evaluado, puedes realizar varios intentos cuantas veces sea necesario. Al terminar tu evaluaci??n podr??s visualizar tus resultados adem??s de consultarlos en el apartado de Rendimiento. Para dudas o aclaraciones contacta a tu profesor docente.";
  const instructions = [
    { id: 1, tip: "??Importante! No abandonar, refrescar o recargar la p??gina durante el examen. Su calificaci??n podr??a verse afectada." },
    { id: 2, tip: "Por favor no abandones el examen ya que no puedes reanudarlo m??s adelante." },
    { id: 3, tip: "Cada que acierte una pregunta se va registrando su progreso hasta concluir el examen." },
    { id: 4, tip: "Si la sesi??n expira a mitad de examen, se le asgina una calificaci??n hasta donde se qued??. En estos casos contacta a tu docente." },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const topics = useSelector(state => state.slices.topicsList);
  const [currentTopic, setCurrentTopic] = useState({});
   
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  
  const handleNext = (topicID, topic) => {
    setCurrentTopic({...currentTopic, 'topicID': topicID, 'topic': topic});
    handleOpenModal(); 
  };

  const handleGoToExam = () => navigate(`exam/t-Id=0${currentTopic.topicID}/name=${currentTopic.topic}`);
  
  useEffect(() => {
    dispatch(acquireAllTopics());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <>
      <Box className={classes.root}>

        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Temario <br/>
          </Typography>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            {description}<br/>
          </Typography><br/>
          <Typography className={classes.tip} variant="h6">
            <TipsAndUpdatesIcon/> <b> Indicaciones </b> <br/>
          </Typography><br/>
          <Box>
            {instructions.map((tip) => (
              <Typography key={tip.id} className={classes.title}> <b> {tip.id}.- {tip.tip} </b> </Typography>
            ))}
          </Box>
        </Box>

        <Box className={classes.topics}>
          <Typography className={classes.title} variant="h5" sx={{fontWeight: "bold",}}> 
            Elige un Tema <br/> 
          </Typography>

          <List sx={{ width: '100%'}}>
            {topics.map(({topicID, topic, subtopics}) => (
              <>
              <ListItemButton 
                key={topicID} 
                className={classes.item} 
                onClick={
                  () => {
                    handleNext(topicID, topic)
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
          
        <ModalConfirm 
          titleModal="Iniciar simulaci??n del tema:"
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
