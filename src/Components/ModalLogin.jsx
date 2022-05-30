import React, {useState} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Modal from "@mui/material/Modal";

import {UserLogin} from "../User/Application/User.logic";
import Button from "./ButtonSimple";
import InputText from "./InputText";

import { useDispatch } from "react-redux";
import { acquireUser } from "../Redux/Slices";

const useStyles = makeStyles((theme) => ({
  container:{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    minHeight: "400px",
    borderRadius: "30px",
    background: "#fff",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
  },
  img:{
    position: "absolute",
    width: "400px",
    height: 400,
    borderRadius: "30px",
    objectFit: "cover",
    zIndex: -1,
  },
  title:{
    fontWeight: "bold",
    color: "#419F00",
  },
}));

export default function ModalLogin({ 
  open,
  handleClose,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Data User
  const [data, setData] = useState({ matricula: "", password: "", });

  // Inputs Values
  const handleInputChange=(e) => setData({ ...data, [e.target.name]: e.target.value });
  
  // Login User
  async function handleLogin(e) {
    e.preventDefault();
    const response = await UserLogin(data);
    const {status, info, role, id, token} = response.data;
    if(status){ // Success
      dispatch(acquireUser(id));
      sessionStorage.setItem('token', token);
      if(role === "Docente"){
        localStorage.setItem("role", "teacher");
        navigate("/teacher/");
        localStorage.setItem("id", id);
        window.location.reload(false);
      }else{
        localStorage.setItem("role", "student");
        navigate("/student/");
        localStorage.setItem("id", id);
        window.location.reload(false);
      }
      open = false
    }
    else{ // Error
      setBand(true)
      setAlert(false)
      setAlertContent(info)
    }
  }

  // Alert
  const [band, setBand] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const showAlert = (alert, alertContent) => {
    return(
      <>
      {alert ? (
        <Alert variant="filled" severity="success" action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setBand(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
          {alertContent}
        </Alert>
      ):(
        <Alert variant="filled" severity="error" action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setBand(false);
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

  return (
    <Modal open={open} onClose={handleClose}>
      <form className={classes.container} onSubmit={handleLogin}>
        <h2 className={classes.title}>Inicio de Sesión</h2>
        {band && ( showAlert(alert, alertContent) )}
        <InputText
          type="text"
          label="Matrícula"
          placeholder="Ingrese su matrícula"
          name="matricula"
          value={data.matricula}
          onChange={handleInputChange}
          widthText={200}
        />
        <InputText
          type="password"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          name="password"
          value={data.password}
          onChange={handleInputChange}
          widthText={200}
        />
        <Button
          type="submit"
          title="Iniciar"
          onClick={handleLogin}
        />
      </form>
    </Modal>
  );
}

ModalLogin.defaultProps ={
  open: false,
  handleClose: () => null,
}

ModalLogin.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};