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
  name,
  label,
  placeholder,
  value,
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
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
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
  name: "",
  value: "",
  onChange: () => null,
  helperText: "",
  disabled: false,
  required: false,
  multiline: false,
};

InputText.propTypes={
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
}
