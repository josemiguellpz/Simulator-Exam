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
    if (carrer === ""){
      const response = {
        data: {
          status: false,
          info: "Indique su carrera universitaria",
        }
      }
      return response
    }

  if (name === ""){
    const response = {
      data: {
        status: false,
        info: "Indique su nombre",
      }
    }
    return response
  }
  
  if (lastName === ""){
    const response = {
      data: {
        status: false,
        info: "Indique sus apellidos",
      }
    }
    return response
  }

  const objectMatricula = validateMatricula(matricula);
  if (!objectMatricula.data.status) return objectMatricula;

  const objectEmail = validateEmail(email);
  if (!objectEmail.data.status) return objectEmail;

  const objectPassword = validatePassword(password);
  if (!objectPassword.data.status) return objectPassword;

  const objectPasswordRepeat = confirmPassword(password, password2);
  if (!objectPasswordRepeat.data.status) return objectPasswordRepeat;

  if(role === "Docente")
    carrer = ""

  const user = new UserModel(role, matricula, name, lastName, email.toLowerCase(), password, carrer)
  return RegisterUser(user);
}

export function UserLogin({
  matricula,
  password,
}){

  // Validations
  
  const objectMatricula = validateMatricula(matricula);
  if (!objectMatricula.data.status) return objectMatricula;
  
  const objectPassword = validatePassword(password);
  if (!objectPassword.data.status) return objectPassword;
  
  matricula = parseInt(matricula)
  return Login(matricula, password);
}