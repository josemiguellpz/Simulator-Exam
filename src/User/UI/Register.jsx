import React, {useState, useEffect} from 'react';
import { makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import {UserRegister} from '../Application/User.logic';
import InputSelect from '../../Components/InputSelect';
import Button from '../../Components/ButtonSimple';
import InputText from '../../Components/InputText';
import BackStudent from '../../Assets/back-student.jpg';
import BackTeacher from '../../Assets/back-teacher.jpg';
import Student from '../../Assets/student.jpg';
import Teacher from '../../Assets/teacher.jpg';

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
    },
  },
  info:{
    /* border: "1px solid", */
    width: "500px",
    height: "470px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
    gap: 10,
    [theme.breakpoints.down("md")]:{
      height: 180,
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
    top: teacher ? 211 : 197,
    width: 520,
    [theme.breakpoints.down("md")]:{
      top: teacher ? 211 : 440,
    },
  }),
  cardForm:({teacher})=>({
    width: 520,
    height: teacher ? 440 : 490,
    marginTop: 30,
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]:{
      marginTop: 10,
    },
  }),
  imgForm: {
    borderRadius: "30px 30px 0px 0px",
    width: 520,
    height:150,
    objectFit: "cover",
  },
  user:({teacher})=>({
    color: "#fff",
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    top: teacher ? 150 : 130,
    [theme.breakpoints.down("md")]:{
      top: teacher ? 150 : 385,
    },
  }),  
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
  const carrers = [
    {value: "Ingeniería en Ciencias de la Computación", },
    {value: "Licenciatura en Ciencias de la Computación", },
    {value: "Ingeniería en Tecnologías de la Información", },
  ];

  // Button Student
  const [student, setStudent] = useState(true);
  const handleStudent = () =>{ 
    setStudent(true)
    setTeacher(false)
  };
  
  // Button Teacher
  const [teacher, setTeacher] = useState(false);
  const handleTeacher = () =>{ 
    setStudent(false)
    setTeacher(true)
  };
  
  // Styles
  const classes = useStyles({teacher});

  useEffect(() => {
    
  }, []);

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

  // Inputs Values
  const handleInputChange=(e) => setData({ ...data, [e.target.name]: e.target.value });
  
  // Register
  async function handleRegister(e) {
    e.preventDefault();
    if(student)
      data.role="Alumno";
    else
      data.role="Docente";
    const {status, info} = UserRegister(data); // await Send Data and Response
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

  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Formulario de Registro
          </Typography><br/>
          <Typography variant="h6" sx={{alignText: "center"}}>
            ¿Eres alumno o docente? Por favor, elige una opción.
          </Typography><br/>
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
          <Box className={classes.selector}>
            <InputSelect
              select
              label="Tipo de usuario"
              widthText={200}
            >
              <MenuItem onClick={handleStudent}> Alumno </MenuItem>
              <MenuItem onClick={handleTeacher}> Docente</MenuItem>
            </InputSelect>
          </Box>
        </Box>

        <Box className={classes.cardForm}>
          {student && (
            <form className={classes.containerFrom} onSubmit={handleRegister}>
              <img className={classes.imgForm}src={BackStudent} alt="back"/>
              <Typography className={classes.user} variant="h3">Alumno</Typography>
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
                    label="Matrícula"
                    placeholder="Ingrese su matrícula"
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
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    value={data.password}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                  <InputText
                    type="password"
                    name="password2"
                    label="Confirmar Contraseña"
                    placeholder="Ingrese su contraseña nuevamente"
                    value={data.password2}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                </Box>
                <Button
                  title="Enviar"
                  type="submit"
                  onClick={handleRegister}
                />
              </Box>
            </form>
          )}
          {teacher && (
            <form className={classes.containerFrom} onSubmit={handleRegister}>
              <img className={classes.imgForm}src={BackTeacher} alt="back"/>
              <Typography className={classes.user} variant="h3">Docente</Typography>
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
                    label="Matrícula"
                    placeholder="Ingrese su matrícula"
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
                    label="Contraseña"
                    placeholder="Ingrese su matrícula"
                    value={data.password}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                  <InputText
                    type="password"
                    name="password2"
                    label="Confirmar Contraseña"
                    placeholder="Ingrese su matrícula nuevamente"
                    value={data.password2}
                    onChange={handleInputChange}
                    widthText={200}
                    />
                </Box>
                <Button
                  title="Enviar"
                  type="submit"
                  onClick={null}
                />
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </>
  );
};
