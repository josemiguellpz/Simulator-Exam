import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';

import Button from "./ButtonSimple";

const useStyles = makeStyles((theme) => ({
  container:{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    minHeight: 300,
    borderRadius: 30,
    background: "#fff",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default function ModalConfirm({ 
  titleModal,
  description,
  titleButton,
  handleButton,
  open,
  handleClose,
}) {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={classes.container}>
        <Typography variant="h5">{titleModal}</Typography>
        <Typography variant="h6">{description}</Typography>
        <Button
          title={titleButton}
          onClick={handleButton}
          />
      </Box>
    </Modal>
  );
}

ModalConfirm.defaultProps ={
  open: false,
  handleClose: () => null,
  handleButton: () => null,
}

ModalConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
};