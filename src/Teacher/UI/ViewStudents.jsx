import React, {useState, useEffect} from 'react';
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import LoadingSpinner from '../../Components/LoadingSpinner';
import InputSelect from '../../Components/InputSelect';
import Button from '../../Components/ButtonSimple';

import { useDispatch, useSelector } from 'react-redux';
import { acquireUser, acquireTopics } from '../../Redux/Slices';

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
  selectStudent: {
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

export default function Home(){
  const classes = useStyles();
  const description = "En esta sección puede consultar el rendimiento académico de los alumnos.";
  const [loading, setLoading] = useState(false);
  const [band, setBand] = useState(true);
  const dispatch = useDispatch();
  const topics = useSelector(state => state.slices.topicsList);
  const user = useSelector(state => state.slices.user);

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

  const [currentTopic, setCurrentTopic] = useState({});
  const handleSelectTopic= (e) => setCurrentTopic({ ...currentTopic, 'topicID': e.target.value.id, 'topic': e.target.value.value });
  const handleChange = () => {
    console.log(user);
    console.log(currentTopic);
  }

  useEffect(() => {
    const matricula = localStorage.getItem('id');
    dispatch(acquireTopics());
    dispatch(acquireUser(matricula));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if(loading) return <LoadingSpinner />
  
    return(
    <>
      <Box className={classes.root} sx={{paddingBottom: "20vh"}}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Alumnos
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            {description}<br/>
          </Typography><br/>
        </Box>

        {/* Generic Alert */}
        {open && ( showAlert(alert, alertContent) )}

        {band &&(
          <Box className={classes.selectStudent}>
            <InputSelect
              select
              name="topic"
              label="Selecciona un Tema"
              widthText={300}
              onChange={handleSelectTopic}
            >
              {topics.map((option) =>(
                <MenuItem key={option.id} value={option}>
                  {option.value}
                </MenuItem>
              ))}
            </InputSelect>
            <Button title="Continuar" onClick={handleChange} />
          </Box>
        )}

      </Box>
    </>
  );
}