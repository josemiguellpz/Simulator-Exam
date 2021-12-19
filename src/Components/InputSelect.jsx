import PropTypes from 'prop-types';
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme)=>({
  root:({widthText})=>({
    width: widthText,
  }),
}));

export default function InputSelect({
  label,
  name,
  onChange,
  select,
  widthText,
  children,
}) {
  const classes = useStyles({widthText});
  return(
    <TextField
      className={classes.root}
      label={label}
      name={name}
      onChange={onChange}
      select={select}
      variant="standard"
    >
      {children}
    </TextField>
  );
};


InputSelect.defaultProps = {
  name: "",
  onChange: () => null,
  select: true,
};

InputSelect.propTypes={
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  select: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
}
