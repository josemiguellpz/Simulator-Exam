import React, {useState} from 'react';
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import Button from '../../Components/ButtonSimple';
import InputSelect from '../../Components/InputSelect';
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
  const [student, setStudent] = useState(true);
  const [teacher, setTeacher] = useState(false);
  const classes = useStyles({teacher});
  const carrers = [
    {value: "Ingeniería en Ciencias de la Computación", },
    {value: "Licenciatura en Ciencias de la Computación", },
    {value: "Ingeniería en Tecnologías de la Información", },
  ];
  const handleStudent = () =>{ 
    setStudent(true)
    setTeacher(false)
  };
  const handleTeacher = () =>{ 
    setStudent(false)
    setTeacher(true)
  };
  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography variant="h4">
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
            <form className={classes.containerFrom}>
              <img className={classes.imgForm}src={BackStudent} alt="back"/>
              <Typography className={classes.user} variant="h3">Alumno</Typography>
              <Box className={classes.items}>
                <Box>
                  <InputSelect
                    select
                    label="Carrera"
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
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                    widthText={200}
                  />
                  <InputText
                    type="text"
                    label="Apellidos"
                    placeholder="Ingrese sus apellidos"
                    widthText={200}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 5}}>
                  <InputText
                    type="number"
                    label="Matrícula"
                    placeholder="Ingrese su matrícula"
                    widthText={200}
                  />
                  <InputText
                    type="email"
                    label="Correo Institucional"
                    placeholder="Ingrese su email"
                    widthText={200}
                    />
                </Box>
                <Box sx={{display: "flex", gap: 5}}>
                  <InputText
                    type="password"
                    label="Contraseña"
                    placeholder="Ingrese su matrícula"
                    widthText={200}
                    />
                  <InputText
                    type="password"
                    label="Confirmar Contraseña"
                    placeholder="Ingrese su matrícula nuevamente"
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
          {teacher && (
            <form className={classes.containerFrom}>
            <img className={classes.imgForm}src={BackTeacher} alt="back"/>
            <Typography className={classes.user} variant="h3">Docente</Typography>
            <Box className={classes.items}>
              <Box sx={{display: "flex", gap: 5}}>
                <InputText
                  type="text"
                  label="Nombre"
                  placeholder="Ingrese su nombre"
                  widthText={200}
                />
                <InputText
                  type="text"
                  label="Apellidos"
                  placeholder="Ingrese sus apellidos"
                  widthText={200}
                  />
              </Box>
              <Box sx={{display: "flex", gap: 5}}>
                <InputText
                  type="number"
                  label="Matrícula"
                  placeholder="Ingrese su matrícula"
                  widthText={200}
                />
                <InputText
                  type="email"
                  label="Correo Institucional"
                  placeholder="Ingrese su email"
                  widthText={200}
                  />
              </Box>
              <Box sx={{display: "flex", gap: 5}}>
                <InputText
                  type="password"
                  label="Contraseña"
                  placeholder="Ingrese su matrícula"
                  widthText={200}
                  />
                <InputText
                  type="password"
                  label="Confirmar Contraseña"
                  placeholder="Ingrese su matrícula nuevamente"
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
