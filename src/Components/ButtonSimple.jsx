import PropTypes from 'prop-types';
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  root:({role})=>({
    color: "#fff !important",
    background:
        role === "user"
          ? `${theme.palette.primary.main} !important`
          : role === "student" 
            ? `${theme.palette.secondary.main} !important`
            : `${theme.palette.tertiary.main} !important`,
    "&:hover": {
      fontWeight: "600",
      background:
        role === "user"
          ? `${theme.palette.primary.dark} !important`
          : role === "student" 
            ? `${theme.palette.secondary.dark} !important`
            : `${theme.palette.tertiary.dark} !important`,
    },
  }),
  text:{
    letterSpacing: 2,
  },
}));

export default function ButtonSimple({
  title,
  type,
  size,
  onClick,
  startIcon,
  endIcon,
  disabled,
}){
  const role = localStorage.getItem("role");
  const classes = useStyles({role});
  /*TODO: Atributo color = role */
  
  return(
    <Button
      className={classes.root}
      color="primary"
      type={type}
      size={size}
      onClick={onClick}
      variant="contained"
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
    >
      <p className={classes.text}>{title}</p>
    </Button>
  );
};

ButtonSimple.defaultProps = {
  onClick: () => null,
  size: "medium",
  disabled: false,
};

ButtonSimple.propTypes ={
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
}