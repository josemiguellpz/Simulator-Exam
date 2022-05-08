import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Button from '../../Components/ButtonSimple';
import ModalConfirm from '../../Components/ModalConfirm';
import InputText from '../../Components/InputText';

import { useDispatch, useSelector } from "react-redux";
import { acquireUser } from "../../Redux/Slices";
import { StudentDelete, StudentUpdate } from "../Application/Teacher.logic";

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
  form: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    borderRadius: "30px",
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    paddingTop: 10,
    paddingBottom: 30,
    marginTop: 30,
  },
}));

export default function StudentEdit(){
  const {studentID} = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector(state => state.slices.user);
  const [data, setData] = useState({ password: "", password2: "", });
  const handleData = (e) => setData({...data, [e.target.name]: e.target.value});

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

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  async function updateDataStudent(){
    const response = await StudentUpdate(student.id, data.password, data.password2);
    const {status, info} = response.data;
    setOpen(true);
    setAlert(status);
    setAlertContent(info);
  }

  async function deleteStudent(){
    const response = await StudentDelete(student.id);
    const {status, info} = response.data;
    if(status){
      setOpen(true);
      setAlert(status);
      setAlertContent(info);
      navigate(-2);
    }
  }

  useEffect(()=>{
    dispatch(acquireUser(studentID));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <Box className={classes.root} sx={{paddingBottom: "20vh"}}>
      <Box className={classes.info}>
        <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
          Editar Datos del Alumno
        </Typography>
        <Typography >
          Gestión del usuario para restaurar contraseña y eliminar usuario. 
        </Typography>
      </Box>
      <Box sx={{marginTop: 2}}>
        <Button
          title="Volver"
          onClick={()=>{navigate(-1)}}
          startIcon={<ArrowBackIcon/>}
        />
      </Box>
      {/* Generic Alert */}
      {open && ( showAlert(alert, alertContent) )}
      
      <Box sx={{marginBottom: 5}}>
        <form className={classes.form} onSubmit={updateDataStudent}>
          <InputText
            name="id"
            type="text"
            label={`${student.id}`}
            widthText={350}
            disabled
          />
          <InputText
            name="name"
            type="text"
            label={`${student.name} ${student.lastName}`}
            widthText={350}
            disabled
          />
          <InputText
            name="email"
            type="email"
            label={`${student.email}`}
            widthText={350}
            disabled
          />
          <InputText
            name="password"
            type="password"
            label="Nueva Contraseña"
            placeholder="Ingrese una nueva contraseña"
            value={data.password}
            onChange={handleData}
            widthText={350}
          />
          <InputText
            name="password2"
            type="password"
            label="Confirmar Nueva Contraseña"
            placeholder="Ingrese nuevamente la contraseña"
            value={data.password2}
            onChange={handleData}
            widthText={350}
          />
          <Button
            title="Actualizar"
            onClick={updateDataStudent}
            startIcon={<RefreshIcon/>}
          />
      </form>
      </Box>
      <Button
        title="Eliminar Estudiante"
        onClick={handleOpenModal}
        startIcon={<DeleteIcon/>}
      />
      
      <ModalConfirm
        titleModal="¿Desea eliminar este alumno?"
        description="Se perderá toda la información relacionada al usuario."
        titleButton="Confirmar"
        handleButton={
          ()=>{
            handleCloseModal(); 
            deleteStudent();
          }
        }
        open={openModal} 
        handleClose={handleCloseModal}
      />
    </Box>
  );
}