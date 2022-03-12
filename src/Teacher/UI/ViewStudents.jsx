import React, {useState, useEffect} from 'react';
import { makeStyles } from "@mui/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonIcon from '@mui/icons-material/Person';

import InputSelect from '../../Components/InputSelect';
import InputText from '../../Components/InputText';
import Button from '../../Components/ButtonSimple';

import { UserSearch } from '../Application/Teacher.logic';
import { useDispatch, useSelector } from 'react-redux';
import { acquireUsers } from '../../Redux/Slices';

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
  resultSearch:{
    width: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  const dispatch = useDispatch();
  const users = useSelector(state => state.slices.usersList);

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

  // Search Student
  const [studentsFound, setStudentsFound] = useState([]);
  const [flag, setFlag] = useState(false);
  const [dataSearch, setDataSearch] = useState("");
  const handleDataSearch = (e) => setDataSearch(e.target.value);
  async function handleSearch (e){
    e.preventDefault();
    const response = await UserSearch(dataSearch);
    const {status, info, students} = response.data;
    if(status){
      if(students.length !== 0){
        setFlag(true);
        setStudentsFound(students);
      }
      else{
        setOpen(true)
        setAlert(false)
        setAlertContent("No se encontraron coincidencias")  
      }
    }else{
      setOpen(true)
      setAlert(status)
      setAlertContent(info)
    }
  }

  // Select Student
  const [studentID, setStudentID] = useState(Number);
  const handleSelectStudent= (e) => setStudentID(e.target.value.id);
  const handleNext = () => console.log(studentID);

  useEffect(() => {
    dispatch(acquireUsers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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

        <Box sx={{display: "flex", gap: 5, marginTop: 5, marginBottom: 3}}>
          <form onSubmit={handleSearch}>
            <InputText
              type="text"
              name="dataSearch"
              placeholder="Buscar por nombre"
              value={dataSearch}
              onChange={handleDataSearch}
              widthText={350}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
              }}
            />
          </form>
          <Button title="Buscar" onClick={handleSearch} endIcon={<PersonSearchIcon/>} />
        </Box>

        {flag && (
          <Box className={classes.resultSearch} sx={{}}>
            <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold"}}>Resultados encontrados</Typography>
            <List sx={{ width: '100%',}}>
              {studentsFound.map((person) => (
                <ListItem key={person.id} onClick={() => {console.log(person)}}>
                  <ListItemAvatar>
                    <Avatar> <PersonIcon /> </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={person.fullName} secondary={person.id} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Box className={classes.selectStudent}>
          <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold"}}>Seleccionar Alumno</Typography>
          <InputSelect
            select
            name="users"
            label="Lista de Alumnos"
            widthText={350}
            onChange={handleSelectStudent}
          >
            {users.map((option) =>(
              <MenuItem key={option.id} value={option}>
                {option.id} {option.name} {option.lastName}
              </MenuItem>
            ))}
          </InputSelect>
          <Button title="Continuar" onClick={handleNext} />
        </Box>
      </Box>
    </>
  );
}