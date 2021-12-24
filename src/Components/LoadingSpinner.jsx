import { makeStyles } from "@mui/styles";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  root:({role}) => ({
    color: 
      role === "user"
          ? `${theme.palette.primary.main} !important`
          : role === "student" 
            ? `${theme.palette.secondary.main} !important`
            : `${theme.palette.tertiary.main} !important`,
    background: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 200,
    gap: 10,
  }),
}));

export default function LoadingSpinner (){
  const role = localStorage.getItem("role")
  const classes = useStyles({role});
  return(
    <>
      <Box className={classes.root}>
        <Typography variant="h4" sx={{letterSpacing: 10, fontWeight: "bold",}}>Express</Typography>
        {role === "user" &&(
          <CircularProgress color="primary"/> 
        )}
        {role === "student" &&(
          <CircularProgress color="secondary"/> 
        )}
        {role === "teacher" &&(
          <CircularProgress color="tertiary"/> 
        )}
      </Box>
    </>
  );
}