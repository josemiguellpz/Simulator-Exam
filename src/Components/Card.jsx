import React from 'react';

import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: ({widthCard, heightCard}) => ({
    borderRadius: "30px",
    /* margin: "70px 0", */
    width: widthCard,
    height: heightCard,
    background: "#fff",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 5px rgba(0, 0, 0, 0.25);",
    display: "flex",
    flexDirection: "column",
  }),
}));

export default function Card({ widthCard, heightCard, children }) {
  const classes = useStyles({widthCard, heightCard});

  return <div className={classes.root}>{children}</div>;
}

Card.defaultProps = {};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};