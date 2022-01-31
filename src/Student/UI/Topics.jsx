import React from 'react';
import { makeStyles, styled} from "@mui/styles";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import Button from '../../Components/ButtonSimple';

const useStyles = makeStyles((theme) => ({
  root:{
    /* border: "solid 1px", */
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    /* [theme.breakpoints.down("md")]:{
      flexDirection: "column",
    }, */
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
    color: `${theme.palette.secondary.main} !important`,
  },
  topics:{
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
    paddingBottom: 40,
  },
}));

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function generate(element) {
  return [0, 1, 2,3,4,5,6,7].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
export default function TopicsStudent() {
  const classes = useStyles();
  const description = "Para realizar la simulación del examen elige un tema para ser evaluado, puedes realizar varios intentos cuantas veces sea necesario. Al terminar tu evaluación tus resultados puedes consultarlos en el apartado de Rendimiento. Para dudas o aclaraciones contacta a tu profesor docente.";
  return(
    <>
      <Box className={classes.root}>
        <Box className={classes.info}>
          <Typography className={classes.title} variant="h4" sx={{fontWeight: "bold",}}>
            Temario Disponible
          </Typography><br/>
          <Typography variant="h6" sx={{textAlign: "justify"}}>
            {description}<br/>
          </Typography><br/>
        </Box>
        <Box className={classes.topics}>
          <Demo>
              <List>
                {generate(
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line itemdddddddddddddd"
                      /* secondary={secondary ? 'Secondary text' : null} */
                    />
                  </ListItem>,
                )}
              </List>
            </Demo>
        </Box>
      </Box>
    </>
  );
};
