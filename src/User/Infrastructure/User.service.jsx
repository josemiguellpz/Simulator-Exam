import {postOne, login, getTopics} from '../../Axios/Provider';

export function RegisterUser(data){
  const body = JSON.stringify(data);
  return postOne("users", body)
}

export function Login(matricula, password){
  const body = JSON.stringify(password)
  return login(matricula, body)
}

export function GetTopics(){
  return getTopics('/topics')
}