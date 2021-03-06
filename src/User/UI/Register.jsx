import React, {useState, useEffect} from 'react';
import { makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import BackStudent from '../../Assets/back-student.jpg';
import BackTeacher from '../../Assets/back-teacher.jpg';
import Student from '../../Assets/student.jpg';
import Teacher from '../../Assets/teacher.jpg';
import LoadingSpinner from '../../Components/LoadingSpinner';
import InputSelect from '../../Components/InputSelect';
import Button from '../../Components/ButtonSimple';
import InputText from '../../Components/InputText';

import {UserRegister} from '../Application/User.logic';

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
      height: "calc(100vh + 200px)",
      gap: 20,
    },
  },
  info:{
    width: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    [theme.breakpoints.down("md")]:{
      marginTop: 50,
    },
  },
  title:{
    color: `${theme.palette.primary.main} !important`,
  },
  options:{
    display: "flex",
    gap: 10,
  },
  img:{
    width: 200,
    height: 250,
    borderRadius: "6px",
    objectFit: "cover",
    [theme.breakpoints.down("md")]:{
      display: "none",
    },
  },
  buttons:{
    display: "flex", 
    gap: 90,
    [theme.breakpoints.down("md")]:{
      display: "none",
    },
  },
  selector:{
    display: "none",
    [theme.breakpoints.down("md")]:{
      display: "flex",
    },
  },
  alert:({teacher})=>({
    position: "absolute",
    width: 520,
    [theme.breakpoints.up("lg")]:{
      top: teacher ? 225 : 195,
    },
    [theme.breakpoints.down("md")]:{
      top: teacher ? 410 : 440,
    },
  }),
  cardForm:{
    display: "flex",
    flexDirection: "column",
    width: 520,
    paddingBottom: 20,
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    [theme.breakpoints.down("md")]:{
      marginTop: 10,
      marginBottom: 50,
    },
  },
  imgForm: {
    width: 520,
    height: 150,
    borderRadius: "30px 30px 0px 0px",
    objectFit: "cover",
  },
  containerFrom:{
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  items:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
  },
}));

export default function Register() {
  localStorage.setItem("role", "user")
  const carrers = [
    {value: "Ingenier??a en Ciencias de la Computaci??n", },
    {value: "Licenciatura en Ciencias de la Computaci??n", },
    {value: "Ingenier??a en Tecnolog??as de la Informaci??n", },
  ];

  // Button Student
  const [student, setStudent] = useState(true);
  const handleStudent = () =>{ 
    setStudent(true);
    setTeacher(false);
    setData({role: "",
    matricula: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    carrer: "",});
  };
  
  // Button Teacher
  const [teacher, setTeacher] = useState(false);
  const handleTeacher = () =>{ 
    setStudent(false);
    setTeacher(true);
    setData({role: "",
    matricula: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    carrer: "",});
  };
  
  // Styles and Loading
  const classes = useStyles({teacher});
  const [loading, setLoading] = useState(false);

  // Data User
  const [data, setData] = useState({
    role: "",
    matricula: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    carrer: "",
  });
  
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

  // Inputs Values
  const handleInputChange=(e) => setData({ ...data, [e.target.name]: e.target.value });
  
  // Register
  async function handleRegister(e) {
    e.preventDefault();
    if(student)
      data.role="Alumno";
    else
      data.role="Docente";
    const response = await UserRegister(data);
    const {status, info} = response.data;
    if(status){ // Success
      setOpen(true)
      setAlert(true)
      setAlertContent(info)
    }
    else{ // Error
      setOpen(true)
      setAlert(false)
      setAlertContent(info)
    }
  }

  const handleClear = () => {
    setData({
      role: "",
      matricula: "",
      name: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
    });
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      await setTimeout(function(){
        setLoading(false)
      }, 1000);
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(loading) return <LoadingSpinner />

  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          {student && (<Typography className={classes.title} variant="h4" sx={{fontWeight: "bold", textAlign: "center"}}>Formulario de Registro Alumno</Typography>)}
          {teacher && (<Typography className={classes.title} variant="h4" sx={{fontWeight: "bold", textAlign: "center"}}>Formulario de Registro Docente</Typography>)}
          <Typography variant="h6" sx={{alignText: "center"}}>
            ??Eres alumno o docente? Por favor, elige una opci??n.
          </Typography>
          <Box className={classes.options}>
            <img className={classes.img} src={Student} alt="student"/>
            <img className={classes.img} src={Teacher} alt="teacher"/>
          </Box>
          <Box className={classes.buttons}>
            <Button
              title="Alumno"
              onClick={handleStudent}
              />
            <Button
              title="Docente"
              onClick={handleTeacher}
            />
          </Box>
        </Box>
        
        <Box className={classes.selector}>
          <InputSelect
            select
            label="Tipo de usuario"
            widthText={200}
          >
            <MenuItem onClick={handleStudent} value="Alumno"> Alumno </MenuItem>
            <MenuItem onClick={handleTeacher} value="Docente"> Docente</MenuItem>
          </InputSelect>
        </Box>

        <Box className={classes.cardForm}>
          {student && (
            <form className={classes.containerFrom} onSubmit={handleRegister}>
              <img className={classes.imgForm}src={BackStudent} alt="back"/>
              {open && ( showAlert(alert, alertContent) )}
              <Box className={classes.items}>
                <Box>
                  <InputSelect
                    select
                    name="carrer"
                    label="Carrera"
                    value={data.carrer}
                    onChange={handleInputChange}
                    widthText={400}
                  >
                    {carrers.map((option) =>(
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </InputSelect>
                </Box>
                <Box sx={{display: "flex", gap: 5}}>
                  <InputText
                    type="text"
                    name="name"
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                    value={data.name}
                    onChange={handleInputChange}
                    widthText={200}
                  />
                  <InputText
                    type="text"
                    name="lastName"
                    label="Apellidos"
                    placeholder="Ingrese sus apellidos"
                    value={data.lastName}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 5}}>
                  <InputText
                    type="text"
                    name="matricula"
                    label="Matr??cula"
                    placeholder="Ingrese su matr??cula"
                    value={data.matricula}
                    onChange={handleInputChange}
                    widthText={200}
                  />
                  <InputText
                    type="email"
                    name="email"
                    label="Correo Institucional"
                    placeholder="Ingrese su email"
                    value={data.email}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 5}}>
                  <InputText
                    type="password"
                    name="password"
                    label="Contrase??a"
                    placeholder="Ingrese su contrase??a"
                    value={data.password}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                  <InputText
                    type="password"
                    name="password2"
                    label="Confirmar Contrase??a"
                    placeholder="Ingrese su contrase??a nuevamente"
                    value={data.password2}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 3}}>
                  <Button
                    title="Limpiar"
                    onClick={handleClear}
                  />
                  <Button
                    title="Enviar"
                    type="submit"
                    onClick={handleRegister}
                  />
                </Box>
              </Box>
            </form>
          )}
          {teacher && (
            <form className={classes.containerFrom} onSubmit={handleRegister}>
              <img className={classes.imgForm}src={BackTeacher} alt="back"/>
              {open && ( showAlert(alert, alertContent) )}
              <Box className={classes.items}>
                <Box sx={{display: "flex", gap: 5}}>
                  <InputText
                    type="text"
                    name="name"
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                    value={data.name}
                    onChange={handleInputChange}
                    widthText={200}
                  />
                  <InputText
                    type="text"
                    name="lastName"
                    label="Apellidos"
                    placeholder="Ingrese sus apellidos"
                    value={data.lastName}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 5}}>
                  <InputText
                    type="text"
                    name="matricula"
                    label="Matr??cula"
                    placeholder="Ingrese su matr??cula"
                    value={data.matricula}
                    onChange={handleInputChange}
                    widthText={200}
                  />
                  <InputText
                    type="email"
                    name="email"
                    label="Correo Institucional"
                    placeholder="Ingrese su email"
                    value={data.email}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 5}}>
                  <InputText
                    type="password"
                    name="password"
                    label="Contrase??a"
                    placeholder="Ingrese su contrase??a"
                    value={data.password}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                  <InputText
                    type="password"
                    name="password2"
                    label="Confirmar Contrase??a"
                    placeholder="Ingrese su contrase??a nuevamente"
                    value={data.password2}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 3}}>
                  <Button
                    title="Limpiar"
                    onClick={handleClear}
                  />
                  <Button
                    title="Enviar"
                    type="submit"
                    onClick={handleRegister}
                  />
                </Box>
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </>
  );
};
