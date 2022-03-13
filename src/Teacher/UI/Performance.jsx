import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import UserIcon from '../../Assets/user-icon.png';
import InputSelect from '../../Components/InputSelect';
import Button from '../../Components/ButtonSimple';

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { acquireSubtopics, acquireTopics, acquireUser } from "../../Redux/Slices";

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
  title:{
    color: `${theme.palette.tertiary.main} !important`,
  },
  photo:{
    width: 130,
    height: 130,
    objectFit: "cover",
  },
  details:{
    display: "flex",
    gap: 20,
    [theme.breakpoints.down("md")]:{
      display: "inline-block",
      gap: 0,
    },
  },
  list:{
    width: '100%',
    maxWidth: 450,
    bgcolor: 'background.paper',
  },
  selectTopic: {
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
}));

export default function Performance(){
  const {studentID} = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.slices.user);
  const topics = useSelector(state => state.slices.topicsList);
  const subtopics = useSelector(state => state.slices.subtopicsList);
  
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

  // Select Topic
  const [currentTopic, setCurrentTopic] = useState({});
  const handleCurrentTopic= (e) => setCurrentTopic({ ...currentTopic, 'subtopicID': e.target.value.id, 'subtopic': e.target.value.value });
  const handleCallSubtopics = (e) => {
    dispatch(acquireSubtopics(e.target.value.id)); // Params: TopicID
    setCurrentTopic({ ...currentTopic, 'topicID': e.target.value.id, 'topic': e.target.value.value });
  }

  const handleContinue = () => {
    if(Object.keys(currentTopic).length !== 4){
      setOpen(true);
      setAlert(false);
      setAlertContent("Seleccione Tema y Subtema");
    }
    else {
      console.log(currentTopic);
    }
  }

  useEffect(() => {
    dispatch(acquireUser(studentID))
    dispatch(acquireTopics());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
    <Box className={classes.root} sx={{paddingBottom: "20vh"}}>
      <Box className={classes.info}>
        <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
          Rendimiento Académico
        </Typography>
        <Box sx={{display: "flex", alignItems: "center", gap: 3, }}>
          <img className={classes.photo} src={UserIcon} alt="user-icon" />
          <Box className={classes.details}>
            <List sx={classes.list}>
              <ListItem divider>
                <ListItemText primary={`Nombre: ${user.name} ${user.lastName}`}/>
              </ListItem>
              <ListItem divider>
                <ListItemText primary={`Carrera: ${user.carrer}`} />
              </ListItem>
            </List>
            <List sx={classes.list}>
              <ListItem divider>
                <ListItemText primary={`Matrícula: ${user.id}`} />
              </ListItem>
              <ListItem divider>
                <ListItemText primary={<p>Contacto: <a href={`mailto:${user.email}`}>{user.email}</a></p>} />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>

      {/* Generic Alert */}
      {open && ( showAlert(alert, alertContent) )}

      <Box className={classes.selectTopic}>
        <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold"}}>Selecciona el Tema a Consultar</Typography>
        <InputSelect
          select
          name="topic"
          label="Tema"
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
          label="Subtema"
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
    </Box>
    </>
  );
}