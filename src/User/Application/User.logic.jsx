import UserModel, {
  validateMatricula,
  validatePassword,
  confirmPassword,
  validateEmail,
} from "../Domain/User.model";
import {
  RegisterUser, 
  Login
} from "../Infrastructure/User.service";

export function UserRegister({
  role,
  matricula,
  name,
  lastName,
  password,
  password2,
  email,
  carrer,
}){

  // Validations 

  if (role === "Alumno") 
    if (carrer === "")
      return {status: false, info: "Indique su carrera universitaria"}

  if (name === "")
    return {status: false, info: "Indique su nombre"}
  
  if (lastName === "")
    return {status: false, info: "Indique sus apellidos"}

  const objectMatricula = validateMatricula(matricula);
  if (!objectMatricula.status) return objectMatricula;

  const objectEmail = validateEmail(email);
  if (!objectEmail.status) return objectEmail;

  const objectPassword = validatePassword(password);
  if (!objectPassword.status) return objectPassword;

  const objectPasswordRepeat = confirmPassword(password, password2);
  if (!objectPasswordRepeat.status) return objectPasswordRepeat;

  if(role === "Docente")
    carrer = ""

  const user = new UserModel(role, matricula, name, lastName, email, password, carrer)
  return RegisterUser(user);
}

export function UserLogin({
  matricula,
  password,
}){

  // Validations
  
  const objectMatricula = validateMatricula(matricula);
  if (!objectMatricula.status) return objectMatricula;
  
  const objectPassword = validatePassword(password);
  if (!objectPassword.status) return objectPassword;
  
  matricula = parseInt(matricula)
  return Login(matricula, password);
}