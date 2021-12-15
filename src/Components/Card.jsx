import React from 'react';

import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "30px",
    /* margin: "70px 0", */
    width: 550,
    height: 250,
    background: "#fff",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
  },
}));

export default function Card({ children }) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}

Card.defaultProps = {};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};