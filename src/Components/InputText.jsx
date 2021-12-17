import PropTypes from 'prop-types';
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme)=>({
  root:({widthText})=>({
    width: widthText,
  }),
}));

export default function InputText({
  type,
  label,
  placeholder,
  onChange,
  helperText,
  widthText,
  disabled,
  required,
  multiline,
}) {
  const classes = useStyles({widthText});
  return(
    <TextField
      className={classes.root}
      type={type}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      helperText={helperText}
      disabled={disabled}
      required={required}
      multiline={multiline}
      rows={4}
      variant="standard"
    />
  );
};


InputText.defaultProps = {
  onChange: () => null,
  helperText: "",
  disabled: false,
  required: false,
  multiline: false,
};

InputText.propTypes={
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
}
