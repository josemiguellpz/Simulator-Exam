import React, {useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import Button from "./ButtonSimple";
import InputText from "./InputText";
import Back from "../Assets/back-login.jpg";

const useStyles = makeStyles((theme) => ({
  container:({widthMax})=> ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
    [theme.breakpoints.up("sm")]: {
      width: "300px",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
    [theme.breakpoints.up("lg")]: {
      width: widthMax,
    },
  }),
  img:({widthMax}) => ({
    position: "absolute",
    width: widthMax,
    height: 400,
    borderRadius: "30px",
    objectFit: "cover",
    zIndex: -1,
    [theme.breakpoints.up("sm")]: {
      width: "300px",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
    [theme.breakpoints.up("lg")]: {
      width: widthMax,
    },
  }),
  title: ({ type }) => ({
    fontWeight: "bold",
    color: "#419F00",
  }),
  center: {
    textAlign: "center",
  },
}));

export default function ModalLogin({ 
  open,
  handleClose 
}) {
  const widthMax = 500;
  const classes = useStyles({widthMax});
  const [data, setData] = useState({
    matricula: "",
    password: "",
  });
  const handleInputChange=(e) => setData({ ...data, [e.target.name]: e.target.value });
  async function handleRegister(e) {
    e.preventDefault();
    // TODO: Send Data
    console.log(data)
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <form className={classes.container} onSubmit={handleRegister}>
        <img className={classes.img}src={Back} alt="font-login"/>
        <h2 className={classes.title}>Inicio de Sesión</h2>
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
          onClick={handleRegister}
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
  /* open: PropTypes.oneOfType([PropTypes.object]).isRequired, */
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};