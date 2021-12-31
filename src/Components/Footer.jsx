import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  background:({role}) => ({
    width: "100%",
    height: 130,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    color: "#fff !important",
    background:
      role === "user"
        ? `${theme.palette.primary.dark} !important`
        : role === "student" 
          ? `${theme.palette.secondary.dark} !important`
          : `${theme.palette.tertiary.dark} !important`
  }),
  contact:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    /* [theme.breakpoints.down("md")]:{
      flexDirection: "column",
    }, */
  },
}));

export default function Footer() {
  const role = localStorage.getItem("role");
  const classes = useStyles({role});
  return(
    <>
      <Box className={classes.background}>
        <Box className={classes.contact}>
          <Typography>
            Contacto
          </Typography>
          <Typography>
            Av San Claudio, Blvrd 14 Sur, Cdad. Universitaria, 72592 Puebla, Pue
          </Typography>
          <Typography>
           © 2022 Todos los derechos reservados
          </Typography>
        </Box>
      </Box>
    </>
  );
};
