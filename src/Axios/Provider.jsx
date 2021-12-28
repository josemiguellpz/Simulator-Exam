// import axios from "axios";
const url = "localhost:5000"

function getConfig() {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return config;
}

export async function postOne(source, body){
  const config = getConfig();
  const route = `${url}/${source}`;
  console.log(body)
  console.log(route)
  // axios.post(route, body, config);
  return {status: true, info: "¡Registro Exitoso! Puede iniciar sesión"}
  /* return axios.post(route, body, config); */
}

export async function getUser(body){
  const config = getConfig();
  const {matricula} = body 
  const route = `${url}/users/${matricula}`;
  console.log(body)
  console.log(route)
  // axios.post(route, body, config);
  return {status: true, info: "Sesión Iniciada"}
  /* return axios.post(route, body, config); */
}

