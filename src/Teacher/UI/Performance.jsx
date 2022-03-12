import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

import InputSelect from '../../Components/InputSelect';
import InputText from '../../Components/InputText';
import Button from '../../Components/ButtonSimple';

import { useDispatch, useSelector } from "react-redux";
import { acquireTopics } from "../../Redux/Slices";

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  info:{
    width: 1000,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 50,
    [theme.breakpoints.down("md")]:{
      width: 700,
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]:{
      width: 400,
      alignItems: "center",
    },
  },
  title:{
    color: `${theme.palette.tertiary.main} !important`,
  },
}));

export default function Performance(){

  const classes = useStyles();
  const dispatch = useDispatch();
  const topics = useSelector(state => state.slices.topicsList);
  const [currentTopic, setCurrentTopic] = useState({});
  const handleSelectTopic= (e) => setCurrentTopic({ ...currentTopic, 'topicID': e.target.value.id, 'topic': e.target.value.value });
  const handleChange = () => {
    console.log(currentTopic);
  }

  useEffect(() => {
    dispatch(acquireTopics());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
    <Box className={classes.root} sx={{paddingBottom: "20vh"}}>
      <Box className={classes.selectStudent}>
        <Typography className={classes.title} variant="h6" sx={{fontWeight: "bold"}}>Seleccionar Tema</Typography>
        <InputSelect
          select
          name="topic"
          label="Lista de Temas"
          widthText={350}
          onChange={handleSelectTopic}
        >
          {topics.map((option) =>(
            <MenuItem key={option.id} value={option}>
              {option.id} {option.name} {option.lastName}
            </MenuItem>
          ))}
        </InputSelect>
        <Button title="Continuar" onClick={handleChange} />
      </Box>
    </Box>
    </>
  );
}