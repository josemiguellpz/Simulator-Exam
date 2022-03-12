import axios from "axios";
const url = "http://localhost:5000";

function getConfig() {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  return config;
}

export async function postOne(source, body){
  const config = getConfig();
  const route = `${url}/${source}`;
  return await axios.post(route, body, config);
}

export async function getOne(source){
  const config = getConfig();
  const route = `${url}/${source}`;
  return await axios.get(route, config);
}

export async function putOne(source, body){
  const config = getConfig();
  const route = `${url}/${source}`;
  return await axios.put(route, body, config);
}

export async function deleteOne(source){
  const config = getConfig();
  const route = `${url}/${source}`;
  return await axios.delete(route, config);
}

export async function login(matricula, body){
  const config = getConfig();
  const route = `${url}/users/${matricula}`;
  return await axios.post(route, body, config);
}

export async function getUser(matricula){
  const config = getConfig();
  const route = `${url}/users/${matricula}`;
  return await axios.get(route, config);
}

export async function getUsers(){
  const config = getConfig();
  const route = `${url}/users`;
  return await axios.get(route, config);
}

export async function getTopics(source){
  const config = getConfig();
  const route = `${url}/${source}`;
  return await axios.get(route, config);
}

export async function getSubtopics(source){
  const config = getConfig();
  const route = `${url}/${source}`;
  return await axios.get(route, config);
}

export async function getQuestions(source){
  const config = getConfig();
  const route = `${url}/${source}`;
  return await axios.get(route, config);
}

