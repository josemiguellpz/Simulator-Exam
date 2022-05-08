import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles, styled } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

import UserIcon from '../../Assets/user-icon.png';
import InputSelect from '../../Components/InputSelect';
import Button from '../../Components/ButtonSimple';
import BarChart from "../../Components/BarChart";

import { useDispatch, useSelector } from "react-redux";
import { acquireTopics, acquireUser } from "../../Redux/Slices";
import { HistorialGet } from "../Application/Teacher.logic";

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
  table:{
    marginTop: 40,
    width: 800,
    [theme.breakpoints.down("md")]:{
      width: 600,
    },
    [theme.breakpoints.down("sm")]:{
      width: 500,
    },
  },
}));

export default function Performance(){
  const {studentID} = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [band, setBand] = useState(true);
  const user = useSelector(state => state.slices.user);
  const topics = useSelector(state => state.slices.topicsList);
  
  useEffect(() => {
    dispatch(acquireUser(studentID))
    dispatch(acquireTopics());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const handleCurrentTopic= (e) => setCurrentTopic({ ...currentTopic, 'topicID': e.target.value.id, 'topic': e.target.value.value });

  //BarChart
  const labels = ['Calificación', 'Respuestas Correctas', 'Respuestas Incorrectas'];
  const [data, setData] = useState({});
  const [attempts, setAttempts] = useState(0);
  const [historial, setHistorial] = useState([]);

  async function getHistorial () {
    if(Object.keys(currentTopic).length !== 2){
      setOpen(true);
      setAlert(false);
      setAlertContent("Seleccione Tema y Subtema");
    }
    else {
      const response = await HistorialGet(user.id, currentTopic.topicID);
      const { attempts, history, average } = response.data;
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
            backgroundColor: '#5271ff',
          },
        ],
      });
      setBand(false);
    }
  }

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
        <Box>
          <Button
            title="Editar"
            onClick={()=>{navigate('edit')}}
            startIcon={<EditIcon/>}
          />
        </Box>
      </Box>

      {/* Generic Alert */}
      {open && ( showAlert(alert, alertContent) )}

      {band ? (
        <Box className={classes.selectTopic}>
          <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold"}}>Selecciona el Tema a Consultar</Typography>
          <InputSelect
            select
            name="topic"
            label="Tema"
            widthText={450}
            onChange={handleCurrentTopic}
          >
            {topics.map((option) =>(
              <MenuItem key={option.id} value={option}>
                {option.value}
              </MenuItem>
            ))}
          </InputSelect>
          <Box sx={{display: "flex", gap: 2}}>
            <Button title="Continuar" onClick={getHistorial} />
            <Button title="Regresar" onClick={()=>{navigate(-1)}} />
          </Box>
        </Box>
      ) : (
        <Box>
          {attempts === 0 ? (
            <Box sx={{textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 5}}>
              <Typography className={classes.title} variant="h5" sx={{marginTop:5}}>
                <b> Sin datos por mostrar para: {currentTopic.topic} </b> <br /> <br />
                <b> El alumno no ha realizado intentos </b> <br />
              </Typography>
              <Box sx={{display: "flex", gap: 10}}>
                <Button
                  title="Regresar"
                  onClick={()=>{setCurrentTopic({}); setBand(true);}}
                />
              </Box>
            </Box>
          ):(
            <>
            <Box className={classes.statistics} sx={{marginTop: 5}}>
              <Typography className={classes.title} variant="h5" sx={{textAlign: "center"}}>
                <b> Tema: {currentTopic.topic}</b> <br /> 
                <b> Ha realizado {attempts} intentos </b>
              </Typography>
              <Box className={classes.barChart} sx={{marginTop: 5, marginBottom: 5}}>
                <BarChart
                  data={data}
                  />
              </Box>
              <Button title="Consultar otro tema" onClick={()=>{setCurrentTopic({}); setBand(true);}} />
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
            
            </>
          )}
        </Box>
      )}

    </Box>
    </>
  );
}