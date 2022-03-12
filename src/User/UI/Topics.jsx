import React, {useState, useEffect} from "react";
import { makeStyles, styled } from "@mui/styles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LoadingSpinner from '../../Components/LoadingSpinner';
import Login from '../../Components/ModalLogin';
import Button from '../../Components/ButtonSimple';

import { useDispatch, useSelector } from "react-redux";
import { acquireTopics }  from "../../Redux/Slices";

// Table styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.primary.light,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    height: "calc(100vh - 64px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
      height: "calc(100vh + 180px)",
    },
  },
  info:{
    width: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    [theme.breakpoints.down("md")]:{
      marginTop: 50,
    },
  },
  title:{
    color: `${theme.palette.primary.main} !important`,
  },
  topics:{
    width: 600,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]:{
      width: 600,
      marginTop: 30,
      marginBottom: 50,
    },
  },
}));

export default function Topic (){
  localStorage.setItem("role", "user")
  const classes = useStyles();
  const dispatch = useDispatch();
  const topics = useSelector(state => state.slices.topicsList)

  // Modal-Login
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // Request Topics at Backend
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const request = async () => {
      setLoading(true);
      dispatch(acquireTopics());
      setLoading(false);
    }
    request();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(loading) return <LoadingSpinner />

  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Listado de Temas
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            En este apartado puedes consultar una vista preliminar de algunos temas
            disponibles. <br/><br/>
            <ArrowRightIcon/> Como docente: Mantener actualizado el contenido temático. <br />
            <ArrowRightIcon/> Como alumno: Pon aprueba tus conocimientos. <br />
            <ArrowRightIcon/> Inicia sesión para tener acceso a más información.
          </Typography><br/>
          <Button
            title="Iniciar"
            onClick={handleOpen}
            size="large"
            endIcon={<KeyboardArrowRightIcon/>}
            />
        </Box>
        <Box className={classes.topics}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Typography variant="h6" sx={{fontWeight: "bold",}}>
                      Temario
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topics.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell scope="row">
                      <Typography sx={{fontSize: "1rem",}}>
                        {row.value}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Login open={open} handleClose={handleClose}/> 
      </Box>
    </>
  );
}