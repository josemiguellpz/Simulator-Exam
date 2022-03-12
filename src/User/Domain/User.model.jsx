class UserModel{
  constructor(role, matricula, name, lastName, email, password, carrer) {
    this.role = role;
    this.matricula = matricula;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.carrer = carrer;
  }
}
export default UserModel;

/* export function validateName(name) {
  const validExpreOwner = /^[ÁÉÍÓÚA-ZÑ][a-záéíóúñ]+(\s+[ÁÉÍÓÚA-ZÑ]?[a-záéíóúñ-ÿ]+)*$/gi;
  
  if (name.replace(/ /g, "") === "" || !validExpreOwner.test(name)) {
    return {
      valid: false,
      info: "El nombre sólo debe contener letras y por lo menos una sílaba",
    };
  }
  return { valid: true, info: "" };
} */

export function validateMatricula(matricula){
  if(matricula.length === 9){
    if(!isNaN(matricula)){
      const response = {
        data: {
          status: true,
          info: "",
        }
      }
      return response
    }
    else{
      const response = {
        data: {
          status: false,
          info: "La matrícula debe ser un valor numérico",
        }
      }
      return response
    }
  }
  const response = {
    data: {
      status: false,
      info: "Matrícula debe estar compuesta de 9 caracteres",
    }
  }
  return response
}

export function validatePassword(password) {
  const expression = /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
 
  if(!expression.test(password)){
    const response = {
      data: {
        status: false,
        info: "Contraseña de al menos 8 caracteres, una mayúscula, un número y una minúscula.",
      }
    }
    return response
  }
  const response = {
    data: {
      status: true,
      info: "",
    }
  }
  return response
}

export function confirmPassword(password, passwordRepeat) {
  if (!password || !passwordRepeat || password !== passwordRepeat) {
    const response = {
      data: {
        status: false,
        info: "Las contraseñas no coinciden.",
      }
    }
    return response
  }
  const response = {
    data: {
      status: true,
      info: "",
    }
  }
  return response
}

export function validateEmail(email) {
  const expression = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

  if (!expression.test(email)) {
    const response = {
      data: {
        status: false,
        info: "Formato de correo inválido.",
      }
    }
    return response
  }
  const response = {
    data: {
      status: true,
      info: "",
    }
  }
  return response
}
