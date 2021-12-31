import React, {useState} from "react";
import { makeStyles, styled } from "@mui/styles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Login from '../../Components/ModalLogin';
import Button from '../../Components/ButtonSimple';

const useStyles = makeStyles((theme) => ({
  root:{
    /* border: "solid 1px", */
    width: "100%",
    /* height: "calc(100vh - 64px)", */
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]:{
      flexDirection: "column",
    },
  },
  info:{
    width: 500,
    height: 250,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    marginLeft: 50,
    marginTop: -70,
    [theme.breakpoints.down("md")]:{
      marginTop: 50,
    },
  },
  title:{
    color: `${theme.palette.primary.main} !important`,
  },
  topics:{
    width: 600,
    height: 400,
    display: "flex",
    flexDirection: "column",
    marginLeft: 100,
    marginTop: 40,
    [theme.breakpoints.down("md")]:{
      width: 500,
      marginLeft: 50,
      marginTop: 30,
      marginButtom: 50,
    },
  },
}));

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

export default function Topic (){
  const classes = useStyles();
  const topics = [
    {id: 1, value: "Calidad", },
    {id: 2, value: "Seguridad", },
    {id: 3, value: "Integridad", },
    {id: 4, value: "Metodologias", },
    {id: 5, value: "Metodologias agiles", },
    {id: 6, value: "SCRUM", },
  ];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Listado de temas
          </Typography><br/>
          <Typography variant="h6" >
            En este apartado puedes consultar una vista preliminar de algunos temas
            disponibles.<br/>
            Inicia sesión para tener acceso a más información.
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
                  <StyledTableCell>Temario</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topics.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell scope="row">
                      {row.value}
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